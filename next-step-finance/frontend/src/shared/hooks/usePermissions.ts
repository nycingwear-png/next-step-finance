import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
// Import others

export const usePermissions = () => {
  useEffect(() => {
    // Request all permissions
    Notifications.requestPermissionsAsync();
    // Log to API
  }, []);
};