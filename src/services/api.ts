
import axios from 'axios';
import { toast } from 'sonner';

// Create an axios instance
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Intercept responses to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

// User Services
export const userService = {
  updateProfile: async (userData: any) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  
  getUserStats: async () => {
    const response = await api.get('/users/stats/overview');
    return response.data;
  },
  
  // Admin routes
  getAllUsers: async (params: any) => {
    const response = await api.get('/users', { params });
    return response.data;
  },
  
  getUserById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  updateUser: async (id: string, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }
};

// Event Services
export const eventService = {
  getAllEvents: async (params: any) => {
    const response = await api.get('/events', { params });
    return response.data;
  },
  
  getEventById: async (id: string) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },
  
  // Admin routes
  createEvent: async (eventData: any) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },
  
  updateEvent: async (id: string, eventData: any) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id: string) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  }
};

// Bet Services
export const betService = {
  getAllUserBets: async (params: any) => {
    const response = await api.get('/bets', { params });
    return response.data;
  },
  
  getBetById: async (id: string) => {
    const response = await api.get(`/bets/${id}`);
    return response.data;
  },
  
  placeBet: async (betData: any) => {
    const response = await api.post('/bets', betData);
    return response.data;
  },
  
  // Admin routes
  getAllBets: async (params: any) => {
    const response = await api.get('/bets/admin/all', { params });
    return response.data;
  },
  
  settleBet: async (id: string, settleData: any) => {
    const response = await api.put(`/bets/${id}/settle`, settleData);
    return response.data;
  }
};

// Wallet Services
export const walletService = {
  getWallet: async () => {
    const response = await api.get('/wallet');
    return response.data;
  },
  
  deposit: async (depositData: any) => {
    const response = await api.post('/wallet/deposit', depositData);
    return response.data;
  },
  
  withdraw: async (withdrawData: any) => {
    const response = await api.post('/wallet/withdraw', withdrawData);
    return response.data;
  },
  
  getTransactions: async (params: any) => {
    const response = await api.get('/wallet/transactions', { params });
    return response.data;
  },
  
  // Admin routes
  addBonus: async (userId: string, bonusData: any) => {
    const response = await api.put(`/wallet/bonus/${userId}`, bonusData);
    return response.data;
  }
};

export default api;
