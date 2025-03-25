
import { toast } from "sonner";
import api from "./api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  wallet: {
    balance: number;
    currency: string;
  };
  isVerified: boolean;
  createdAt: string;
}

const authService = {
  register: async (userData: RegisterData): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
  },
  
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post('/auth/login', credentials);
    return response.data.data;
  },
  
  logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  // Store token in localStorage
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Remove token from localStorage
  removeToken: (): void => {
    localStorage.removeItem('token');
  }
};

export default authService;
