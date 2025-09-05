import book2 from "../assets/book2.jpg";
import book1 from "../assets/image.png";
import axios from "axios";


const BASE_URL = "https://library-management-system-1-mrua.onrender.com/api";


const getUserToken = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token || !user) throw new Error("User token not found");
  return { token, user };
};




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
// Create a new payment request (user selects plan)



// Create a new payment (called when user selects a plan)


// Create payment + upload screenshot in one request
export const createPayment = async (userId,bankTransactionID, amount, file = null) => {
  try {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("amount", amount);
    formData.append("bankTransactionID",bankTransactionID );

    if (file) formData.append("paymentProof", file);

    const { token } = getUserToken();

    const res = await axios.post(`https://library-management-system-1-mrua.onrender.com/payments`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data; // expects { paymentId, status, ... }
  } catch (err) {
    console.error("Error creating payment:", err.response?.data || err);
    throw err;
  }
};
// Request to return a book (marks it pending)
export const requestReturnBook = async (borrowId) => {
  try {
    if (!borrowId) throw new Error("borrowId is required");

    const { token, user } = getUserToken();
    if (!user.is_member) throw new Error("Only members can return books");

    const response = await axios.put(
      `${BASE_URL}/return/request/${borrowId}`, 
      { userId: user._id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data; 
  } catch (err) {
    console.error("Error requesting return:", err.response?.data || err);
    throw err;
  }
};


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
  status: record.status?.toLowerCase(), 
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
  const { token } = getUserToken(); 
  const res = await axios.put(`${BASE_URL}/return/approve/${borrowId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
export const getPendingReturns = async () => {
  const { token } = getUserToken(); 
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
      image: record.book?.imageUrl || book1, 
      title: record.book?.title || "Untitled",
      author: record.book?.author || "Unknown",
      category: record.book?.catagory || "Unknown",
      borrowDate: record.borrowDate || "-",
      dueDate: record.dueDate || "-",
      returnDate: record.returnDate || null,
      status: record.status, 
    }));
  } catch (err) {
    console.error("Error fetching borrow history:", err);

    
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
// Mock Admin Service for testing UI without backend

// Dashboard stats
export const getDashboardStats = async () => {
  return {
    totalBooks: 156,
    totalUsers: 89,
    activeMembers: 67,
    pendingPayments: 5,
    totalBorrowings: 234,
    overdueBooks: 8,
  };
};

// Pending payments
let payments = [
  { _id: "1", userName: "Jane Doe", email: "jane@example.com", plan: "1 Month", amount: 29.99, status: "Pending" },
  { _id: "2", userName: "Mike Wilson", email: "mike@example.com", plan: "3 Months", amount: 79.99, status: "Pending" },
];

export const getPendingPayments = async () => {
  return payments;
};

// Approve a payment
export const approvePayment = async (id) => {
  payments = payments.map((p) => (p._id === id ? { ...p, status: "Approved" } : p));
  return { success: true };
};

// Reject a payment
export const rejectPayment = async (id) => {
  payments = payments.map((p) => (p._id === id ? { ...p, status: "Rejected" } : p));
  return { success: true };
};

// Update payment status (used by AdminDash)
export const updatePaymentStatus = async (id, status) => {
  payments = payments.map((p) => (p._id === id ? { ...p, status } : p));
  return { success: true };
};

// Recent borrowings
export const getRecentBorrowings = async () => {
  return [
    { _id: "1", bookTitle: "The Great Gatsby", userName: "John Student", status: "borrowed" },
    { _id: "2", bookTitle: "To Kill a Mockingbird", userName: "Mike Wilson", status: "overdue" },
  ];
};


const API_URL = "https://library-management-system-1-mrua.onrender.com";

export const updateUserProfile = async (payload) => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let response;
    if (payload instanceof FormData) {
      response = await axios.put(`${API_URL}/auth/profile`, payload, {
        headers,
      });
    } else {
      response = await axios.put(`${API_URL}/auth/profile`, payload, {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const updatedUser = response.data.user;

    localStorage.setItem("user", JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error) {
    console.error(
      "Update profile failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
