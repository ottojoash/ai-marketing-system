import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const login = async (formData) => {
  const response = await api.post('/login', formData);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/register', userData);
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/auth/user');
  return response.data;
};

// Export the API instance for general use
export default api;
