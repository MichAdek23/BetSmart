
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'bet_placed', 'bet_won', 'bet_lost', 'cashout', 'bonus'],
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Transaction amount is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  reference: {
    type: String
  },
  description: {
    type: String
  },
  bet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bet'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
