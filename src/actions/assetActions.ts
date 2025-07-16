import { apiService } from '../services/api';
import { toast } from '../hooks/use-toast';

export const assetActions = {
  async getAssets(params?: { page?: number; limit?: number; category?: string; location?: string }) {
    try {
      return await apiService.getAssets(params);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load assets",
        variant: "destructive",
      });
      throw error;
    }
  },

  async getAsset(id: string) {
    try {
      return await apiService.getAsset(id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load asset details",
        variant: "destructive",
      });
      throw error;
    }
  },

  async createAsset(assetData: any) {
    try {
      const response = await apiService.createAsset(assetData);
      
      toast({
        title: "Success",
        description: "Asset created successfully",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create asset",
        variant: "destructive",
      });
      throw error;
    }
  },

  async updateAsset(id: string, assetData: any) {
    try {
      const response = await apiService.updateAsset(id, assetData);
      
      toast({
        title: "Success",
        description: "Asset updated successfully",
      });
      
      return response;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update asset",
        variant: "destructive",
      });
      throw error;
    }
  },

  async deleteAsset(id: string) {
    try {
      await apiService.deleteAsset(id);
      
      toast({
        title: "Success",
        description: "Asset deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete asset",
        variant: "destructive",
      });
      throw error;
    }
  }
};