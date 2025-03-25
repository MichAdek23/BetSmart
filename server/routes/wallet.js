
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/wallet
// @desc    Get user wallet information
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
      success: true,
      data: {
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

// @route   POST /api/wallet/deposit
// @desc    Deposit funds to wallet
// @access  Private
router.post('/deposit', protect, async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid deposit amount'
      });
    }
    
    // In a real application, this would integrate with a payment gateway
    // For demo purposes, we'll simulate a successful deposit
    
    // Update user balance
    const user = await User.findById(req.user._id);
    user.wallet.balance += parseFloat(amount);
    await user.save();
    
    // Create transaction record
    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'deposit',
      amount: parseFloat(amount),
      status: 'completed',
      reference: `DEP-${Date.now()}`,
      description: `Deposit via ${paymentMethod || 'credit card'}`
    });
    
    res.status(200).json({
      success: true,
      data: {
        transaction,
        wallet: {
          balance: user.wallet.balance,
          currency: user.wallet.currency
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

// @route   POST /api/wallet/withdraw
// @desc    Withdraw funds from wallet
// @access  Private
router.post('/withdraw', protect, async (req, res) => {
  try {
    const { amount, withdrawalMethod, accountDetails } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid withdrawal amount'
      });
    }
    
    const user = await User.findById(req.user._id);
    
    // Check if user has enough balance
    if (user.wallet.balance < parseFloat(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient funds in wallet'
      });
    }
    
    // In a real application, this would integrate with a payment processor
    // For demo purposes, we'll simulate a successful withdrawal
    
    // Update user balance
    user.wallet.balance -= parseFloat(amount);
    await user.save();
    
    // Create transaction record
    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'withdrawal',
      amount: -parseFloat(amount),
      status: 'completed', // In reality, this might start as 'pending'
      reference: `WIT-${Date.now()}`,
      description: `Withdrawal to ${withdrawalMethod || 'bank account'}`
    });
    
    res.status(200).json({
      success: true,
      data: {
        transaction,
        wallet: {
          balance: user.wallet.balance,
          currency: user.wallet.currency
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

// @route   GET /api/wallet/transactions
// @desc    Get user transactions
// @access  Private
router.get('/transactions', protect, async (req, res) => {
  try {
    const { type, status, limit = 10, page = 1 } = req.query;
    
    // Build query
    const query = { user: req.user._id };
    
    if (type) query.type = type;
    if (status) query.status = status;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('bet', 'selection odds stake');
      
    const total = await Transaction.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/wallet/bonus
// @desc    Add bonus to user wallet (admin only)
// @access  Private/Admin
router.put('/bonus/:userId', protect, authorize('admin'), async (req, res) => {
  try {
    const { amount, reason } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid bonus amount'
      });
    }
    
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user balance
    user.wallet.balance += parseFloat(amount);
    await user.save();
    
    // Create transaction record
    const transaction = await Transaction.create({
      user: req.params.userId,
      type: 'bonus',
      amount: parseFloat(amount),
      status: 'completed',
      reference: `BON-${Date.now()}`,
      description: reason || 'Bonus awarded by admin'
    });
    
    res.status(200).json({
      success: true,
      data: {
        transaction,
        wallet: {
          balance: user.wallet.balance,
          currency: user.wallet.currency
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
