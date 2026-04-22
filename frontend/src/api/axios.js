import axios from 'axios';

// Added: Configure base URL pointing directly to the FastAPI server running on port 8000
const api = axios.create({
    baseURL: 'http://localhost:8000',
});

// Added: Request interceptor to automatically enforce Authorization headers with JWT tokens globally
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Added: Authorization header injection
    }
    return config;
}, (error) => Promise.reject(error));

// Added: Response error handling to watch for stale JWT tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) { // Added: Clearing local token state on 401 error
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default api;
