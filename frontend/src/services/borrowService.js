import API from "./api";

const MOCK_RECORDS = [
  {
    id: "r1",
    book: { title: "Mock Book A", author: "Author A", cover: "" },
    user: { name: "John Student", email: "student@library.com" },
    borrowDate: "2025-08-01",
    dueDate: "2025-08-15",
    returnDate: null,
    status: "borrowed",
  },
];

export const getAllBorrows = async () => {
  try {
    const res = await API.get("/api/borrow/all");
    return res.data || [];
  } catch (err) {
    console.warn(
      "borrowService.getAllBorrows failed, returning mock",
      err.message
    );
    return MOCK_RECORDS;
  }
};

export const updateBorrowStatus = async (id, status) => {
  try {
    const res = await API.put(`/borrow/${id}`, { status });
    return res.data;
  } catch (err) {
    console.warn("borrowService.updateBorrowStatus failed", err.message);
    return { success: false };

import book2 from "../assets/book2.jpg";
import book1 from "../assets/image.png";
import axios from "axios";

const BASE_URL = "https://library-management-system-1-mrua.onrender.com/api";

const getUserToken = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (!token || !user) throw new Error("User token not found");
  return { token, user };
};

export const borrowBook = async (bookId) => {
  try {
    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can borrow books");

    const response = await axios.post(
      `${BASE_URL}/borrow/${bookId}`,
      { bookId, userId: user._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err) {
    console.error("Error borrowing book:", err);
    throw err;
  }
};

export const returnBook = async (bookId) => {
  try {
    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can return books");

    const response = await axios.post(
      `${BASE_URL}/borrow/return/${bookId}`,
      { userId: user._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err) {
    console.error("Error returning book:", err);
    throw err;
  }
};

// --------------------------
// Get currently borrowed books
export const getBorrowedBooks = async () => {
  try {
    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can view borrowed books");

    const res = await axios.get(`${BASE_URL}/borrow/active/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const records = Array.isArray(res.data) ? res.data : res.data.data || [];

    return records.map((record) => ({
      id: record._id,
      image: record.book?.imageUrl || book1,
      title: record.book?.title || "Untitled",
      author: record.book?.author || "Unknown",
      category: record.book?.category || "Unknown",
      borrowed: record.borrowedAt ? new Date(record.borrowedAt).toLocaleDateString() : "-",
      dueDate: record.dueDate ? new Date(record.dueDate).toLocaleDateString() : "-",
      returned: record.returnedAt ? new Date(record.returnedAt).toLocaleDateString() : "-",
      status: record.returned ? "Returned" : "Borrowed",
    }));
  } catch (err) {
    console.error("Error fetching borrowed books:", err);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.is_member) {
      return [
        {
          id: 1,
          image: book2,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          category: "Classic Literature",
          borrowed: "2025-08-19",
          dueDate: "2025-09-02",
          returned: "-",
          status: "Borrowed",
        },
        {
          id: 2,
          image: book1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          category: "Classic Literature",
          borrowed: "2025-08-16",
          dueDate: "2025-08-30",
          returned: "-",
          status: "Borrowed",
        },
      ];
    }

    return [];
  }
};

// --------------------------
// Get borrow history (returned books)
export const getBorrowHistory = async () => {
  try {
    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can view borrow history");

    const res = await axios.get(`${BASE_URL}/borrow/history/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const records = Array.isArray(res.data) ? res.data : res.data.data || [];

    return records.map((record) => ({
      id: record._id,
      image: record.book?.imageUrl || book1,
      title: record.book?.title || "Untitled",
      author: record.book?.author || "Unknown",
      category: record.book?.category || "Unknown",
      borrowed: record.borrowedAt ? new Date(record.borrowedAt).toLocaleDateString() : "-",
      dueDate: record.dueDate ? new Date(record.dueDate).toLocaleDateString() : "-",
      returned: record.returnedAt ? new Date(record.returnedAt).toLocaleDateString() : "-",
      status: record.returned ? "Returned" : "Borrowed",
    }));
  } catch (err) {
    console.error("Error fetching borrow history:", err);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.is_member) {
      return [
        {
          id: 1,
          image: book2,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          category: "Fantasy",
          borrowed: "2025-07-27",
          dueDate: "2025-08-10",
          returned: "2025-08-10",
          status: "Returned",
        },
        {
          id: 2,
          image: book1,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          category: "Romance",
          borrowed: "2025-07-12",
          dueDate: "2025-07-26",
          returned: "2025-07-27",
          status: "Returned",
        },
      ];
    }

    return [];
  }
};
