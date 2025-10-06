// Same as frontend, but for web (proxy via Tor browser or socks)
import axios from 'axios';

export default axios.create({ baseURL: 'http://nextstepfinance.onion/api' });