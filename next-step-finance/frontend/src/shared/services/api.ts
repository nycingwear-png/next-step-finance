import axios from 'axios';
// Tor integration
import Tor from 'react-native-tor';

Tor.startTor(); // Auto-start Tor daemon

const api = axios.create({
  baseURL: 'http://nextstepfinance.onion/api', // Onion URL
  proxy: { protocol: 'socks5', host: '127.0.0.1', port: 9050 } // Tor proxy
});

export default api;