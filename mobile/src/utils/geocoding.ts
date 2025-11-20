import axios from 'axios';

import { ENV } from '../config/env';

const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
  try {
    // Skip invalid addresses
    if (!address || address.trim() === '' || address.trim().length < 3 || address.trim() === 'N') {
      console.log('🔵 Geocoding: Skipping invalid address:', address);
      return null;
    }

    console.log('🔵 Geocoding: Attempting to geocode:', address);
    
    if (!ENV.GOOGLE_MAPS_API_KEY) {
      console.error('❌ Geocoding: GOOGLE_MAPS_API_KEY not configured');
      return null;
    }
    
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        address: address,
        key: ENV.GOOGLE_MAPS_API_KEY,
      },
    });

    console.log('📊 Geocoding: Response status:', response.data.status);

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      const coords = {
        latitude: location.lat,
        longitude: location.lng,
      };
      console.log('✅ Geocoding: Success for', address, '->', coords);
      return coords;
    } else {
      console.warn('⚠️ Geocoding failed:', response.data.status, 'for address:', address);
      return null;
    }
  } catch (error: any) {
    console.error('❌ Geocoding error for', address, ':', error.message);
    return null;
  }
};

export const geocodeMultipleAddresses = async (
  addresses: string[],
): Promise<Map<string, Coordinates>> => {
  const results = new Map<string, Coordinates>();
  
  // Geocode addresses in parallel (with rate limiting consideration)
  const promises = addresses.map(async (address) => {
    const coords = await geocodeAddress(address);
    if (coords) {
      results.set(address, coords);
    }
    return { address, coords };
  });

  await Promise.all(promises);
  return results;
};

