
const express = require('express');
const router = express.Router();
const Bet = require('../models/Bet');
const User = require('../models/User');
const Event = require('../models/Event');
const Transaction = require('../models/Transaction');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/bets
// @desc    Get all user bets
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;
    
    // Build query
    const query = { user: req.user._id };
    
    if (status) query.status = status;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const bets = await Bet.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('event', 'title teams date time');
      
    const total = await Bet.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: bets.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: bets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/bets/:id
// @desc    Get single bet
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id)
      .populate('event', 'title teams date time venue');
    
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: 'Bet not found'
      });
    }
    
    // Check if bet belongs to user or if user is admin
    if (bet.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this bet'
      });
    }
    
    res.status(200).json({
      success: true,
      data: bet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/bets
// @desc    Place a new bet
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { eventId, selection, odds, stake } = req.body;
    
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if event is still accepting bets
    if (event.status !== 'upcoming' && event.status !== 'live') {
      return res.status(400).json({
        success: false,
        message: 'Event is no longer accepting bets'
      });
    }
    
    // Check if user has enough balance
    const user = await User.findById(req.user._id);
    if (user.wallet.balance < parseFloat(stake)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient funds in wallet'
      });
    }
    
    // Calculate potential winnings
    const potentialWinnings = parseFloat(stake) * parseFloat(odds);
    
    // Create bet
    const bet = await Bet.create({
      user: req.user._id,
      event: eventId,
      selection,
      odds,
      stake,
      potentialWinnings,
      status: 'pending'
    });
    
    // Update user balance
    user.wallet.balance -= parseFloat(stake);
    await user.save();
    
    // Create transaction record
    await Transaction.create({
      user: req.user._id,
      type: 'bet_placed',
      amount: -parseFloat(stake),
      status: 'completed',
      bet: bet._id,
      description: `Bet placed on ${event.title} - ${selection}`
    });
    
    // Return bet with event details
    const populatedBet = await Bet.findById(bet._id)
      .populate('event', 'title teams date time');
    
    res.status(201).json({
      success: true,
      data: populatedBet,
      wallet: {
        balance: user.wallet.balance,
        currency: user.wallet.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/bets/:id/settle
// @desc    Settle a bet (admin only)
// @access  Private/Admin
router.put('/:id/settle', protect, authorize('admin'), async (req, res) => {
  try {
    const { result, status } = req.body;
    
    const bet = await Bet.findById(req.params.id);
    if (!bet) {
      return res.status(404).json({
        success: false,
        message: 'Bet not found'
      });
    }
    
    // Only pending bets can be settled
    if (bet.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'This bet has already been settled'
      });
    }
    
    // Update bet status and result
    bet.status = status;
    bet.result = result;
    
    // If bet is won, calculate and set amount
    let settledAmount = 0;
    if (status === 'won') {
      settledAmount = bet.potentialWinnings;
      bet.settledAmount = settledAmount;
      
      // Update user balance
      const user = await User.findById(bet.user);
      user.wallet.balance += settledAmount;
      await user.save();
      
      // Create transaction record
      await Transaction.create({
        user: bet.user,
        type: 'bet_won',
        amount: settledAmount,
        status: 'completed',
        bet: bet._id,
        description: `Bet won: ${bet.selection}`
      });
    } else if (status === 'lost') {
      // Create transaction record for lost bet
      await Transaction.create({
        user: bet.user,
        type: 'bet_lost',
        amount: 0,
        status: 'completed',
        bet: bet._id,
        description: `Bet lost: ${bet.selection}`
      });
    } else if (status === 'canceled') {
      // Refund stake
      settledAmount = bet.stake;
      bet.settledAmount = settledAmount;
      
      // Update user balance
      const user = await User.findById(bet.user);
      user.wallet.balance += settledAmount;
      await user.save();
      
      // Create transaction record
      await Transaction.create({
        user: bet.user,
        type: 'bet_canceled',
        amount: settledAmount,
        status: 'completed',
        bet: bet._id,
        description: `Bet canceled: Stake refunded`
      });
    }
    
    await bet.save();
    
    res.status(200).json({
      success: true,
      data: bet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/bets/admin/all
// @desc    Get all bets (admin only)
// @access  Private/Admin
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, user, event, limit = 20, page = 1 } = req.query;
    
    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (user) query.user = user;
    if (event) query.event = event;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const bets = await Bet.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user', 'username email')
      .populate('event', 'title teams date time');
      
    const total = await Bet.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: bets.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: bets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
