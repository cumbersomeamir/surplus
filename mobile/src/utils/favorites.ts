import axios from 'axios';
import { Platform } from 'react-native';

// For Android emulator, use: http://10.0.2.2:4000
// For iOS simulator, use: http://localhost:4000
// For physical device, use your computer's IP: http://YOUR_IP:4000
const API_BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:4000'
    : 'http://localhost:4000'
  : 'https://your-production-api.com';

export const addFavorite = async (username: string, itemId: string, itemData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/favorites`, {
      username,
      itemId,
      itemData,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Error adding favorite:', error);
    return { success: false, error: error.message };
  }
};

export const removeFavorite = async (username: string, itemId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/favorites`, {
      data: { username, itemId },
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error removing favorite:', error);
    return { success: false, error: error.message };
  }
};

export const getFavorites = async (username: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/favorites/${username}`);
    return { success: true, data: response.data.data || [] };
  } catch (error: any) {
    console.error('Error fetching favorites:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const checkFavorite = async (username: string, itemId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/favorites/check`, {
      params: { username, itemId },
    });
    return response.data.isFavorite || false;
  } catch (error: any) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

