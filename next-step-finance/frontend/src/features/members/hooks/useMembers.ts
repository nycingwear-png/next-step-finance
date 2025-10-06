import { useEffect, useState } from 'react';
import api from '../../../shared/services/api';

export const useMembers = () => {
  const [outstanding, setOutstanding] = useState([]);

  useEffect(() => {
    api.get('/user/outstanding').then(res => setOutstanding(res.data));
  }, []);

  return { outstanding };
};