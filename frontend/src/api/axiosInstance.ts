import axios, { type AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const confg: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
    timeout: 2000, // Request timeout
    withCredentials: true
};

const app = axios.create(confg);

export default app;