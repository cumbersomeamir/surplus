import axios from 'axios';

import { BagData } from '../navigation/AppNavigator';
import { ENV } from '../config/env';

export const getItems = async (category?: string): Promise<BagData[]> => {
  try {
    const params = category && category !== 'All' ? { category } : {};
    const response = await axios.get(`${ENV.API_BASE_URL}/api/items`, { params });
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
    const response = await axios.get(`${ENV.API_BASE_URL}/api/items/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error: any) {
    console.error('Error fetching item:', error);
    return null;
  }
};

