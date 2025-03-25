
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  league: {
    type: String,
    required: [true, 'League is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  teams: [{
    name: {
      type: String,
      required: [true, 'Team name is required']
    },
    logo: {
      type: String
    },
    odds: {
      type: String,
      required: [true, 'Team odds are required']
    }
  }],
  venue: {
    type: String
  },
  attendance: {
    type: String
  },
  imageUrl: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  result: {
    winner: {
      type: String
    },
    score: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
