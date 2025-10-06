import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Request permissions after login
    import('expo-location').then(({ requestForegroundPermissionsAsync }) => requestForegroundPermissionsAsync());
    // Similar for contacts, notifications
    // Log to API for server save
  }, [token]);

  const login = async (token) => {
    setToken(token);
    await AsyncStorage.setItem('token', token);
  };

  return { token, login };
};