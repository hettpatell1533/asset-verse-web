import { apiService } from '../services/api';
import { toast } from '../hooks/use-toast';

export const authActions = {
  async login(credentials: { email: string; password: string }) {
    try {
      const response: any = await apiService.login(credentials);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('auth', JSON.stringify({
          isAuthenticated: true,
          user: response.user
        }));
        
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        
        return response;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  },

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    try {
      const response = await apiService.register(userData);
      
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  },

  async logout() {
    try {
      await apiService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  async getProfile() {
    try {
      return await apiService.getProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
      throw error;
    }
  }
};