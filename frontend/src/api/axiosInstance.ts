import axios, { type AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api';

const confg: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    timeout: 2000, // Request timeout
    withCredentials: true
};

const app = axios.create(confg);

// Attach JWT to every request
app.interceptors.request.use((config) => {
  const token = localStorage.getItem("pitchHRtoken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
app.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const status = error.response?.status;
    
    // Check only the path (e.g., "/login")
    const isLoginPage = window.location.pathname === "/login";

    // 1. Show the toast
    toast.error(message);

    // 2. Handle 401 Unauthorized
    if (status === 401) {
      // Clear storage
      localStorage.removeItem("pitchHRtoken");
      localStorage.removeItem("user");

      // 3. ONLY redirect if the user is NOT already on the login page
      if (!isLoginPage) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default app;