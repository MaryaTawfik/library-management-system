// services/borrowService.js
import axios from "axios";

// Use your deployed Render backend
const API_URL = "https://library-management-system-1-mrua.onrender.com/api/borrow";

export const borrowBook = async (bookId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const response = await axios.post(
      `${API_URL}/${bookId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error borrowing book:", error.response?.data || error.message);
    throw error;
  }
};
