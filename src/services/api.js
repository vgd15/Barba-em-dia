import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pj2-biblioteca-univesp.onrender.com/api/Book',
});

export default api;
