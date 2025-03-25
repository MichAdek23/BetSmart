
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const Bet = require('./models/Bet');
const Transaction = require('./models/Transaction');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/betsmart');

// Sample data
const users = [
  {
    username: 'admin',
    email: 'admin@betsmart.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    wallet: {
      balance: 1000,
      currency: 'USD'
    }
  },
  {
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    isVerified: true,
    wallet: {
      balance: 500,
      currency: 'USD'
    }
  },
  {
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'user',
    isVerified: true,
    wallet: {
      balance: 750,
      currency: 'USD'
    }
  }
];

const events = [
  {
    title: 'Premier League: Liverpool vs Manchester City',
    league: 'Premier League',
    description: 'Top of the table clash between Liverpool and Manchester City',
    date: new Date('2023-12-20'),
    time: '15:00',
    teams: [
      {
        name: 'Liverpool',
        odds: '2.10'
      },
      {
        name: 'Manchester City',
        odds: '1.90'
      }
    ],
    venue: 'Anfield, Liverpool',
    attendance: '52,000',
    imageUrl: 'https://picsum.photos/800/400',
    isFeatured: true,
    isPopular: true,
    status: 'upcoming'
  },
  {
    title: 'NBA: Lakers vs Warriors',
    league: 'NBA',
    description: 'LeBron James faces Steph Curry in this Western Conference showdown',
    date: new Date('2023-12-18'),
    time: '19:30',
    teams: [
      {
        name: 'LA Lakers',
        odds: '1.85'
      },
      {
        name: 'Golden State Warriors',
        odds: '2.05'
      }
    ],
    venue: 'Crypto.com Arena, Los Angeles',
    attendance: '18,997',
    imageUrl: 'https://picsum.photos/800/400',
    isFeatured: true,
    isPopular: true,
    status: 'upcoming'
  },
  {
    title: 'UFC 300: Main Event',
    league: 'UFC',
    description: 'Championship fight for the Heavyweight title',
    date: new Date('2023-12-30'),
    time: '22:00',
    teams: [
      {
        name: 'Jon Jones',
        odds: '1.75'
      },
      {
        name: 'Francis Ngannou',
        odds: '2.25'
      }
    ],
    venue: 'T-Mobile Arena, Las Vegas',
    attendance: '20,000',
    imageUrl: 'https://picsum.photos/800/400',
    isFeatured: false,
    isPopular: true,
    status: 'upcoming'
  },
  {
    title: 'Wimbledon Final: Men\'s Singles',
    league: 'Tennis',
    description: 'The prestigious Wimbledon final for men\'s singles',
    date: new Date('2024-07-14'),
    time: '14:00',
    teams: [
      {
        name: 'Novak Djokovic',
        odds: '1.65'
      },
      {
        name: 'Carlos Alcaraz',
        odds: '2.35'
      }
    ],
    venue: 'Centre Court, Wimbledon',
    attendance: '15,000',
    imageUrl: 'https://picsum.photos/800/400',
    isFeatured: false,
    isPopular: false,
    status: 'upcoming'
  }
];

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Event.deleteMany();
    await Bet.deleteMany();
    await Transaction.deleteMany();
    
    console.log('Data cleared from the database...');
    
    // Create users
    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} users created`);
    
    // Create events
    const createdEvents = await Event.create(events);
    console.log(`${createdEvents.length} events created`);
    
    // Create sample bets and transactions
    const sampleBets = [];
    const sampleTransactions = [];
    
    // User 1 places bets
    const bet1 = {
      user: createdUsers[1]._id,
      event: createdEvents[0]._id,
      selection: 'Liverpool',
      odds: '2.10',
      stake: 50,
      potentialWinnings: 50 * 2.1,
      status: 'pending'
    };
    
    const bet2 = {
      user: createdUsers[1]._id,
      event: createdEvents[1]._id,
      selection: 'LA Lakers',
      odds: '1.85',
      stake: 100,
      potentialWinnings: 100 * 1.85,
      status: 'pending'
    };
    
    sampleBets.push(bet1, bet2);
    
    // Create transactions for the bets
    sampleTransactions.push({
      user: createdUsers[1]._id,
      type: 'bet_placed',
      amount: -50,
      status: 'completed',
      description: `Bet placed on ${createdEvents[0].title} - Liverpool`
    });
    
    sampleTransactions.push({
      user: createdUsers[1]._id,
      type: 'bet_placed',
      amount: -100,
      status: 'completed',
      description: `Bet placed on ${createdEvents[1].title} - LA Lakers`
    });
    
    // User 2 places bets
    const bet3 = {
      user: createdUsers[2]._id,
      event: createdEvents[0]._id,
      selection: 'Manchester City',
      odds: '1.90',
      stake: 75,
      potentialWinnings: 75 * 1.9,
      status: 'pending'
    };
    
    const bet4 = {
      user: createdUsers[2]._id,
      event: createdEvents[2]._id,
      selection: 'Jon Jones',
      odds: '1.75',
      stake: 150,
      potentialWinnings: 150 * 1.75,
      status: 'pending'
    };
    
    sampleBets.push(bet3, bet4);
    
    // Create transactions for the bets
    sampleTransactions.push({
      user: createdUsers[2]._id,
      type: 'bet_placed',
      amount: -75,
      status: 'completed',
      description: `Bet placed on ${createdEvents[0].title} - Manchester City`
    });
    
    sampleTransactions.push({
      user: createdUsers[2]._id,
      type: 'bet_placed',
      amount: -150,
      status: 'completed',
      description: `Bet placed on ${createdEvents[2].title} - Jon Jones`
    });
    
    // Create deposit transactions
    sampleTransactions.push({
      user: createdUsers[1]._id,
      type: 'deposit',
      amount: 500,
      status: 'completed',
      reference: `DEP-${Date.now()}`,
      description: 'Initial deposit via credit card'
    });
    
    sampleTransactions.push({
      user: createdUsers[2]._id,
      type: 'deposit',
      amount: 750,
      status: 'completed',
      reference: `DEP-${Date.now() + 1}`,
      description: 'Initial deposit via bank transfer'
    });
    
    // Create the bets
    const createdBets = await Bet.create(sampleBets);
    console.log(`${createdBets.length} bets created`);
    
    // Update transactions with bet IDs
    sampleTransactions[0].bet = createdBets[0]._id;
    sampleTransactions[1].bet = createdBets[1]._id;
    sampleTransactions[2].bet = createdBets[2]._id;
    sampleTransactions[3].bet = createdBets[3]._id;
    
    // Create the transactions
    const createdTransactions = await Transaction.create(sampleTransactions);
    console.log(`${createdTransactions.length} transactions created`);
    
    console.log('Sample data imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run the import
importData();
