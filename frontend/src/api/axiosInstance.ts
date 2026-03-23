import axios, { type AxiosRequestConfig } from 'axios';

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

    if (error.response && error.response.status === 401) {
      // Token invalid or expired

      localStorage.removeItem("pitchHRtoken");
      localStorage.removeItem("user");

      // redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default app;