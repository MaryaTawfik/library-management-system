// src/services/bookService.js
import API from "./api";
const API_URL = "/books"; // API client already uses baseURL
/*const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://library-management-system-1-mrua.onrender.com";
const API_URL = `${BASE_URL}/books`;
*/
/**
 * Get all books
 */
export const getAllBooks = async () => {
  try {
    const res = await API.get(API_URL);
    return res.data || [];
  } catch (err) {
    console.error("Error fetching books:", err.message);
    // fallback mock data
    return [
      {
        bookId: "B001",
        image: "/book1.png",
        title: "Don’t Make Me Think",
        category: "Computer Science",
        description: "A classic on usability and design principles.",
        author: "Steve Krug",
        pages: 450,
        totalcopies: 12,
        avaliablecopies: 7,
        type: "Hard Copy",
        publishedYear: "2000",
        isbn: "978-0134093413",
        edition: "2nd Edition",
        publisher: "Tech Publications",
        language: "English",
      },
      {
        bookId: "B002",
        imageUrl: "/book2.png",
        title: "The Design of Everyday Things",
        catagory: "Design",
        description: "How human-centered design makes products usable.",
        author: "Don Norman",
        pages: 380,
        totalcopies: 8,
        avaliablecopies: 0,
        type: "E-Book",
        publishedYear: "1988",
        isbn: "978-0321977616",
        edition: "2nd Edition",
        publisher: "MathWorld Press",
        language: "English",
      },
    ];
  }
};

/**
 * Get single book by id
 */
export const getBookById = async (id) => {
  try {
    const res = await API.get(`${API_URL}/${id}`);
    return res.data || null;
  } catch (err) {
    console.error("Error fetching book:", err.message);
    const mockBooks = await getAllBooks();
    return mockBooks.find((b) => b.bookId === id || b._id === id) || null;
  }
};

/**
 * Create new book
 */
export const createBook = async (bookData, token) => {
  // bookData can be FormData if contains image
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await API.post(API_URL, bookData, { headers });
  return res.data;
};

/**
 * Update existing book
 */
export const updateBook = async (id, bookData, token) => {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await API.put(`${API_URL}/${id}`, bookData, { headers });
  return res.data;
};

/**
 * Delete book
 */
export const deleteBook = async (id, token) => {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await API.delete(`${API_URL}/${id}`, { headers });
  return res.data;
};
