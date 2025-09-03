import book2 from "../assets/book2.jpg";
import book1 from "../assets/image.png";
import axios from "axios";

const BASE_URL = "https://library-management-system-1-mrua.onrender.com/api";

// --------------------------
// Get user token and info
const getUserToken = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token || !user) throw new Error("User token not found");
  return { token, user };
};

// --------------------------
// Borrow a book
export const borrowBook = async (bookId) => {
  try {
    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can borrow books");

    const response = await axios.post(
      `${BASE_URL}/borrow/${bookId}`,
      { userId: user._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err) {
    console.error("Error borrowing book:", err);
    throw err;
  }
};

// --------------------------
// Return a borrowed book (use borrowId!)

// Request to return a book (marks it pending)
export const requestReturnBook = async (borrowId) => {
  try {
    if (!borrowId) throw new Error("borrowId is required");

    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can return books");

    const response = await axios.put(
      `${BASE_URL}/return/request/${borrowId}`, // ✅ Correct route
      { userId: user._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data; // backend should return updated borrow record with status "Pending"
  } catch (err) {
    console.error("Error requesting return:", err.response?.data || err);
    throw err;
  }
};

// --------------------------
// Get currently borrowed books
export const getBorrowedBooks = async () => {
  try {
    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can view borrowed books");

    const res = await axios.get(`${BASE_URL}/borrow/active`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const records = Array.isArray(res.data) ? res.data : res.data.data || [];
return records.map((record) => ({
  borrowId: record.borrowId,
  image: record.book?.imageUrl || book1,
  title: record.book?.title || "Untitled",
  author: record.book?.author || "Unknown",
  category: record.book?.catagory || "Unknown",
  borrowDate: record.borrowDate
    ? new Date(record.borrowDate).toLocaleDateString()
    : "-",
  dueDate: record.dueDate
    ? new Date(record.dueDate).toLocaleDateString()
    : "-",
  returned: record.returnDate
    ? new Date(record.returnDate).toLocaleDateString()
    : "-",
  status: record.status?.toLowerCase(), // ✅ keep raw status
}));

    
  } catch (err) {
    console.error("Error fetching borrowed books:", err);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.is_member) {
      return [
        {
          borrowId: "dummy1",
          image: book2,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          category: "Classic Literature",
          borrowDate: "2025-08-19",
          dueDate: "2025-09-02",
          returned: "-",
          status: "Borrowed",
        },
        {
          borrowId: "dummy2",
          image: book1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          category: "Classic Literature",
          borrowDate: "2025-08-16",
          dueDate: "2025-08-30",
          returned: "-",
          status: "Borrowed",
        },
      ];
    }

    return [];
  }
};
//admin approval
export const approveReturnBook = async (borrowId) => {
  const { token } = getUserToken(); // your admin token
  const res = await axios.put(`${BASE_URL}/return/approve/${borrowId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const getPendingReturns = async () => {
  const { token } = getUserToken(); // get the token from your auth helper
  try {
    const response = await axios.get(`${BASE_URL}/borrow/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending returns:", error);
    throw error;
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

    const records = Array.isArray(res.data.data) ? res.data.data : [];

    return records.map((record) => ({
      borrowId: record.borrowId,
      image: record.book?.imageUrl || book1, // fallback if missing
      title: record.book?.title || "Untitled",
      author: record.book?.author || "Unknown",
      category: record.book?.catagory || "Unknown",
      borrowDate: record.borrowDate || "-",
      dueDate: record.dueDate || "-",
      returnDate: record.returnDate || null,
      status: record.status, // already comes as "returned" | "borrowed" | "pending_return"
    }));
  } catch (err) {
    console.error("Error fetching borrow history:", err);

    // fallback for testing
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.is_member) {
      return [
        {
          borrowId: "dummy1",
          image: book2,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          category: "Fantasy",
          borrowDate: "2025-07-27",
          dueDate: "2025-08-10",
          returnDate: "2025-08-10",
          status: "returned",
        },
      ];
    }

    return [];
  }
};

