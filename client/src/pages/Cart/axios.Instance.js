import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800', // Your backend server URL
  withCredentials: true, // This ensures cookies are sent with requests
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
