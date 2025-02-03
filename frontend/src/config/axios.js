import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Add a request interceptor to dynamically add the token
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

// Optional: Add a response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized: Token may be invalid or expired.");
            // Optionally, redirect the user to the login page
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

console.log("Base URL:", import.meta.env.VITE_BASE_URL);

export default axiosInstance;
