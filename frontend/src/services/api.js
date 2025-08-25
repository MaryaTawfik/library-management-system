export const API_BASE = "http://localhost:5000/api"; // your backend URL

export const getToken = () => localStorage.getItem("token");

export const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});
