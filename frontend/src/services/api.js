export const API_BASE = "https://library-management-system-1-mrua.onrender.com/api"; // your backend URL

export const getToken = () => localStorage.getItem("token");

export const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});
