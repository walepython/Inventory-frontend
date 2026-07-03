import axios from 'axios';

// For Vite, use import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://inventrory-management-system-2.onrender.com'//'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && token.split('.').length === 3) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      // Remove Content-Type for multipart — let browser set it with boundary
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }
  
      console.log('Making request to:', config.url);
      return config;
    }
  );
export default api;