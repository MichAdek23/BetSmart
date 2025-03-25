
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'bet_placed', 'bet_won', 'bet_lost', 'cashout', 'bonus', 'promotion', 'referral', 'fee'],
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
    enum: ['pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'],
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
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'crypto', 'cash', null],
    default: null
  },
  paymentDetails: {
    type: Object,
    default: {}
  },
  metadata: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for query performance
TransactionSchema.index({ user: 1, createdAt: -1 });
TransactionSchema.index({ type: 1, status: 1 });

module.exports = mongoose.model('Transaction', TransactionSchema);
