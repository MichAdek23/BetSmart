
const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  selection: {
    type: String,
    required: [true, 'Bet selection is required']
  },
  odds: {
    type: String,
    required: [true, 'Bet odds are required']
  },
  stake: {
    type: Number,
    required: [true, 'Bet stake is required'],
    min: [0.01, 'Minimum stake is 0.01']
  },
  potentialWinnings: {
    type: Number,
    required: [true, 'Potential winnings are required']
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost', 'canceled', 'cashout', 'partial_cashout', 'void'],
    default: 'pending'
  },
  result: {
    type: String,
    enum: ['win', 'loss', 'void', 'push', null],
    default: null
  },
  settledAmount: {
    type: Number,
    default: 0
  },
  betType: {
    type: String,
    enum: ['single', 'parlay', 'system', 'teaser', 'if_bet', 'live', 'prop'],
    default: 'single'
  },
  isLiveBet: {
    type: Boolean,
    default: false
  },
  cashoutAvailable: {
    type: Boolean,
    default: false
  },
  cashoutValue: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  settledAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Add indexing for better performance
BetSchema.index({ user: 1, createdAt: -1 });
BetSchema.index({ event: 1, status: 1 });
BetSchema.index({ status: 1, isLiveBet: 1 });

module.exports = mongoose.model('Bet', BetSchema);
