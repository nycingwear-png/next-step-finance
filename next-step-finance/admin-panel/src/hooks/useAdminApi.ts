import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query'; // Add react-query if needed

const api = axios.create({ baseURL: 'http://nextstepfinance.onion/api' });

export default function useAdminApi(endpoint, options = {}) {
  const { data, refetch } = useQuery(endpoint, () => api.get(endpoint).then(res => res.data));
  const mutate = useMutation((data) => api(options.method || 'POST', endpoint, data));

  return { data, refetch, mutate };
}