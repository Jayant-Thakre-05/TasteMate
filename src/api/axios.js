// /recipe/src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://tastemate-back.onrender.com',
  withCredentials: true, // only if backend uses cookies; you can set false otherwise
  "content/headers": {
    "accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default api;
