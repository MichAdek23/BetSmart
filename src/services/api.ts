
import axios from 'axios';
import { toast } from 'sonner';
import authServiceInstance from './authService';

// Define interfaces for API responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    pages: number;
    total: number;
  };
}

// Create an axios instance
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = authServiceInstance.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle errors and token expiration globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      authServiceInstance.removeToken();
      window.location.href = '/login';
      toast.error('Your session has expired. Please login again.');
    } else {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

// Types for services
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  wallet: {
    balance: number;
    currency: string;
  };
  createdAt: string;
}

export interface EventData {
  _id: string;
  title: string;
  league: string;
  description?: string;
  date: string;
  time: string;
  teams: Array<{
    name: string;
    logo?: string;
    odds: string;
  }>;
  venue?: string;
  attendance?: string;
  imageUrl?: string;
  isFeatured: boolean;
  isPopular: boolean;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  result?: {
    winner?: string;
    score?: string;
  };
  createdAt: string;
}

export interface BetData {
  _id: string;
  user: string | User;
  event: string | EventData;
  selection: string;
  odds: string;
  stake: number;
  potentialWinnings: number;
  status: 'pending' | 'won' | 'lost' | 'canceled' | 'cashout' | 'partial_cashout' | 'void';
  result?: 'win' | 'loss' | 'void' | 'push' | null;
  settledAmount: number;
  betType: 'single' | 'parlay' | 'system' | 'teaser' | 'if_bet' | 'live' | 'prop';
  isLiveBet: boolean;
  cashoutAvailable: boolean;
  cashoutValue: number;
  createdAt: string;
  settledAt?: string;
}

export interface TransactionData {
  _id: string;
  user: string | User;
  type: 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost' | 'cashout' | 'bonus' | 'promotion' | 'referral' | 'fee';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  reference?: string;
  description?: string;
  bet?: string | BetData;
  paymentMethod?: 'credit_card' | 'debit_card' | 'bank_transfer' | 'e_wallet' | 'crypto' | 'cash' | null;
  createdAt: string;
}

export interface WalletData {
  balance: number;
  currency: string;
}

// Auth Services
export const authService = {
  register: async (userData: {username: string; email: string; password: string; firstName?: string; lastName?: string}): Promise<ApiResponse<{user: User; token: string}>> => {
    const response = await api.post<ApiResponse<{user: User; token: string}>>('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: {username: string; password: string}): Promise<ApiResponse<{user: User; token: string}>> => {
    const response = await api.post<ApiResponse<{user: User; token: string}>>('/auth/login', credentials);
    return response.data;
  },
  
  logout: async (): Promise<ApiResponse<{message: string}>> => {
    const response = await api.post<ApiResponse<{message: string}>>('/auth/logout');
    return response.data;
  },
  
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data;
  }
};

// User Services
export const userService = {
  updateProfile: async (userData: {firstName?: string; lastName?: string; email?: string}): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>('/users/profile', userData);
    return response.data;
  },
  
  getUserStats: async (): Promise<ApiResponse<{
    bettingStats: {
      totalBets: number;
      activeBets: number;
      wonBets: number;
      lostBets: number;
      winRate: number;
    };
    financialStats: {
      totalStaked: number;
      totalWon: number;
      profit: number;
    };
    recentActivity: {
      bets: BetData[];
      transactions: TransactionData[];
    };
  }>> => {
    const response = await api.get<ApiResponse<any>>('/users/stats/overview');
    return response.data;
  },
  
  // Admin routes
  getAllUsers: async (params: {
    role?: 'user' | 'admin';
    limit?: number;
    page?: number;
    search?: string;
  }): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>('/users', { params });
    return response.data;
  },
  
  getUserById: async (id: string): Promise<ApiResponse<{
    user: User;
    stats: {
      betsCount: number;
      wonBets: number;
      totalStaked: number;
      totalWon: number;
    }
  }>> => {
    const response = await api.get<ApiResponse<any>>(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, userData: {
    role?: 'user' | 'admin';
    isVerified?: boolean;
    wallet?: {
      balance: number;
      currency: string;
    }
  }): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData);
    return response.data;
  }
};

// Event Services
export const eventService = {
  getAllEvents: async (params: {
    league?: string;
    status?: 'upcoming' | 'live' | 'completed' | 'cancelled';
    featured?: boolean;
    popular?: boolean;
    limit?: number;
    page?: number;
  }): Promise<ApiResponse<EventData[]>> => {
    const response = await api.get<ApiResponse<EventData[]>>('/events', { params });
    return response.data;
  },
  
  getEventById: async (id: string): Promise<ApiResponse<EventData>> => {
    const response = await api.get<ApiResponse<EventData>>(`/events/${id}`);
    return response.data;
  },
  
  // Admin routes
  createEvent: async (eventData: Omit<EventData, '_id' | 'createdAt'>): Promise<ApiResponse<EventData>> => {
    const response = await api.post<ApiResponse<EventData>>('/events', eventData);
    return response.data;
  },
  
  updateEvent: async (id: string, eventData: Partial<EventData>): Promise<ApiResponse<EventData>> => {
    const response = await api.put<ApiResponse<EventData>>(`/events/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await api.delete<ApiResponse<{}>>(`/events/${id}`);
    return response.data;
  }
};

// Bet Services
export const betService = {
  getAllUserBets: async (params: {
    status?: 'pending' | 'won' | 'lost' | 'canceled';
    limit?: number;
    page?: number;
  }): Promise<ApiResponse<BetData[]>> => {
    const response = await api.get<ApiResponse<BetData[]>>('/bets', { params });
    return response.data;
  },
  
  getBetById: async (id: string): Promise<ApiResponse<BetData>> => {
    const response = await api.get<ApiResponse<BetData>>(`/bets/${id}`);
    return response.data;
  },
  
  placeBet: async (betData: {
    eventId: string;
    selection: string;
    odds: string;
    stake: number;
  }): Promise<ApiResponse<{
    bet: BetData;
    wallet: WalletData;
  }>> => {
    const response = await api.post<ApiResponse<any>>('/bets', betData);
    return response.data;
  },
  
  // Admin routes
  getAllBets: async (params: {
    status?: 'pending' | 'won' | 'lost' | 'canceled';
    user?: string;
    event?: string;
    limit?: number;
    page?: number;
  }): Promise<ApiResponse<BetData[]>> => {
    const response = await api.get<ApiResponse<BetData[]>>('/bets/admin/all', { params });
    return response.data;
  },
  
  settleBet: async (id: string, settleData: {
    result: 'win' | 'loss' | 'void' | 'push';
    status: 'won' | 'lost' | 'canceled' | 'void';
  }): Promise<ApiResponse<BetData>> => {
    const response = await api.put<ApiResponse<BetData>>(`/bets/${id}/settle`, settleData);
    return response.data;
  }
};

// Wallet Services
export const walletService = {
  getWallet: async (): Promise<ApiResponse<WalletData>> => {
    const response = await api.get<ApiResponse<WalletData>>('/wallet');
    return response.data;
  },
  
  deposit: async (depositData: {
    amount: number;
    paymentMethod?: string;
  }): Promise<ApiResponse<{
    transaction: TransactionData;
    wallet: WalletData;
  }>> => {
    const response = await api.post<ApiResponse<any>>('/wallet/deposit', depositData);
    return response.data;
  },
  
  withdraw: async (withdrawData: {
    amount: number;
    withdrawalMethod?: string;
    accountDetails?: any;
  }): Promise<ApiResponse<{
    transaction: TransactionData;
    wallet: WalletData;
  }>> => {
    const response = await api.post<ApiResponse<any>>('/wallet/withdraw', withdrawData);
    return response.data;
  },
  
  getTransactions: async (params: {
    type?: 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_won' | 'bet_lost' | 'cashout' | 'bonus';
    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
    limit?: number;
    page?: number;
  }): Promise<ApiResponse<TransactionData[]>> => {
    const response = await api.get<ApiResponse<TransactionData[]>>('/wallet/transactions', { params });
    return response.data;
  },
  
  // Admin routes
  addBonus: async (userId: string, bonusData: {
    amount: number;
    reason?: string;
  }): Promise<ApiResponse<{
    transaction: TransactionData;
    wallet: WalletData;
  }>> => {
    const response = await api.put<ApiResponse<any>>(`/wallet/bonus/${userId}`, bonusData);
    return response.data;
  }
};

export default api;
