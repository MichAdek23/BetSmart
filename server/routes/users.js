
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Bet = require('../models/Bet');
const Transaction = require('../models/Transaction');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { role, limit = 10, page = 1, search } = req.query;
    
    // Build query
    const query = {};
    
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await User.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get single user
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user stats
    const betsCount = await Bet.countDocuments({ user: req.params.id });
    const wonBets = await Bet.countDocuments({ 
      user: req.params.id,
      status: 'won'
    });
    const totalStaked = await Bet.aggregate([
      { $match: { user: user._id } },
      { $group: { _id: null, total: { $sum: '$stake' } } }
    ]);
    const totalWon = await Bet.aggregate([
      { $match: { user: user._id, status: 'won' } },
      { $group: { _id: null, total: { $sum: '$settledAmount' } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          betsCount,
          wonBets,
          totalStaked: totalStaked.length > 0 ? totalStaked[0].total : 0,
          totalWon: totalWon.length > 0 ? totalWon[0].total : 0
        }
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

// @route   PUT /api/users/:id
// @desc    Update user (admin only)
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { role, isVerified, wallet } = req.body;
    
    const updateData = {};
    if (role) updateData.role = role;
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    if (wallet) updateData.wallet = wallet;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        wallet: user.wallet
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

// @route   GET /api/users/stats/overview
// @desc    Get user betting stats
// @access  Private
router.get('/stats/overview', protect, async (req, res) => {
  try {
    // Get user bet stats
    const totalBets = await Bet.countDocuments({ user: req.user._id });
    const activeBets = await Bet.countDocuments({ 
      user: req.user._id,
      status: 'pending'
    });
    const wonBets = await Bet.countDocuments({ 
      user: req.user._id,
      status: 'won'
    });
    const lostBets = await Bet.countDocuments({ 
      user: req.user._id,
      status: 'lost'
    });
    
    // Get financial stats
    const totalStaked = await Bet.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: '$stake' } } }
    ]);
    
    const totalWon = await Bet.aggregate([
      { $match: { user: req.user._id, status: 'won' } },
      { $group: { _id: null, total: { $sum: '$settledAmount' } } }
    ]);
    
    // Get recent bets
    const recentBets = await Bet.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('event', 'title teams');
      
    // Get recent transactions
    const recentTransactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        bettingStats: {
          totalBets,
          activeBets,
          wonBets,
          lostBets,
          winRate: totalBets > 0 ? (wonBets / totalBets) * 100 : 0
        },
        financialStats: {
          totalStaked: totalStaked.length > 0 ? totalStaked[0].total : 0,
          totalWon: totalWon.length > 0 ? totalWon[0].total : 0,
          profit: (totalWon.length > 0 ? totalWon[0].total : 0) - (totalStaked.length > 0 ? totalStaked[0].total : 0)
        },
        recentActivity: {
          bets: recentBets,
          transactions: recentTransactions
        }
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

module.exports = router;
