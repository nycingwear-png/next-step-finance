import { useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useApi = () => {
  const api = useCallback(async (endpoint, options = {}) => {
    const token = await AsyncStorage.getItem('token');
    return axios({
      url: `${process.env.API_URL || 'http://nextstepfinance.onion'}${endpoint}`,
      headers: { Authorization: `Bearer ${token}` },
      ...options
    });
  }, []);

  return api;
};