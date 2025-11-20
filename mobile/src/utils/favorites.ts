import axios from 'axios';

import { ENV } from '../config/env';

export const addFavorite = async (username: string, itemId: string, itemData: any) => {
  try {
    const response = await axios.post(`${ENV.API_BASE_URL}/api/favorites`, {
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
    await axios.delete(`${ENV.API_BASE_URL}/api/favorites`, {
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
    const response = await axios.get(`${ENV.API_BASE_URL}/api/favorites/${username}`);
    return { success: true, data: response.data.data || [] };
  } catch (error: any) {
    console.error('Error fetching favorites:', error);
    return { success: false, error: error.message, data: [] };
  }
};

export const checkFavorite = async (username: string, itemId: string) => {
  try {
    const response = await axios.get(`${ENV.API_BASE_URL}/api/favorites/check`, {
      params: { username, itemId },
    });
    return response.data.isFavorite || false;
  } catch (error: any) {
    // Don't log 429 errors (rate limiting) to reduce noise
    if (error.response?.status !== 429) {
      console.error('Error checking favorite:', error);
    }
    return false;
  }
};

