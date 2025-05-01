import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendbarbaemdia.onrender.com',
});

export default api;
