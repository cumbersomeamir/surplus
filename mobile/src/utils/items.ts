import axios from 'axios';
import { Platform } from 'react-native';
import { BagData } from '../navigation/AppNavigator';

// For Android emulator, use: http://10.0.2.2:4000
// For iOS simulator, use: http://localhost:4000
// For physical device, use your computer's IP: http://YOUR_IP:4000
const API_BASE_URL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:4000'
    : 'http://localhost:4000'
  : 'https://your-production-api.com';

export const getItems = async (category?: string): Promise<BagData[]> => {
  try {
    const params = category && category !== 'All' ? { category } : {};
    const response = await axios.get(`${API_BASE_URL}/api/items`, { params });
    if (response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return [];
  }
};

export const getItemById = async (id: string): Promise<BagData | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/items/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching item:', error);
    return null;
  }
};

