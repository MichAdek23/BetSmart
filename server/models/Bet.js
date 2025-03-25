
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
    enum: ['pending', 'won', 'lost', 'canceled', 'cashout'],
    default: 'pending'
  },
  result: {
    type: String,
    enum: ['win', 'loss', 'void', null],
    default: null
  },
  settledAmount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bet', BetSchema);
