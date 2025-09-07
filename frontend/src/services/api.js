// export const API_BASE = "https://library-management-system-1-mrua.onrender.com/api"; // your backend URL

// export const getToken = () => localStorage.getItem("token");

// export const authHeader = () => ({
//   Authorization: `Bearer ${getToken()}`,
// });

// export default API;
// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // uses .env value
});

// Add token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;