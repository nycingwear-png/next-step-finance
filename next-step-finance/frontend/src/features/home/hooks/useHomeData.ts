import { useEffect, useState } from 'react';
import api from '../../../shared/services/api';

export const useHomeData = () => {
  const [data, setData] = useState({ level: '', balance: 0, transactions: [], commissions: [] });

  useEffect(() => {
    api.get('/user/home').then(res => setData(res.data));
  }, []);

  return { data };
};