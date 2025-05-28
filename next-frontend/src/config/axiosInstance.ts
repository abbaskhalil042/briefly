// api.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://briefly-s1r0.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to inject token dynamically
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;