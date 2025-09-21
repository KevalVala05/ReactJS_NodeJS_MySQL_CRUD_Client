import axios, { AxiosInstance } from 'axios';

const API: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Function to set or remove the Authorization token
export const setAuthToken = (token: string | null | undefined): void => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export default API;
