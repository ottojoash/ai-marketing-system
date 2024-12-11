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

export const registerUser = async (formData) => {
  const response = await api.post('/register', formData);
  return response.data;
};

// Fetch user profile data
export const getUser = async () => {
  const response = await api.get('/user'); // Adjust this endpoint based on your backend
  return response.data;
};

// Update user profile data
export const updateUser = async (userData) => {
  const response = await api.put('/user', userData); // Assuming PUT is used for updates
  return response.data;
};

// Fetch predictions with optional filters
export const fetchPredictions = async (filters = {}) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/analytics/predictions`, {
      params: filters,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching predictions:", error.response?.data || error.message);
    throw error;
  }
};

// Submit a new prediction request
export const submitPrediction = async (predictionData) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/analytics/predict`,
      predictionData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error submitting prediction:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all strategies for the logged-in user
export const fetchStrategies = async () => {
  try {
    const { data } = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching strategies:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch strategies" };
  }
};

// Create a new strategy
export const createStrategy = async (strategyData) => {
  try {
    const { data } = await axios.post(API_BASE_URL, strategyData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  } catch (error) {
    console.error("Error creating strategy:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to create strategy" };
  }
};

// Generate AI-based strategy suggestions
export const generateStrategySuggestions = async (goal, audience, budget) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/suggest`,
      { goal, audience, budget },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return data;
  } catch (error) {
    console.error("Error generating strategy suggestions:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to generate suggestions" };
  }
};

// Fetch predefined templates
export const fetchTemplates = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/templates`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return data;
  } catch (error) {
    console.error("Error fetching templates:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to fetch templates" };
  }
};


// Export the API instance for general use
export default api;
