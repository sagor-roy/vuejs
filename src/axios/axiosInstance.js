import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1', // Replace with your base URL
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    config => {
        const authStore = useAuthStore();
        const token = authStore.user ? authStore.user.token : '';
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
