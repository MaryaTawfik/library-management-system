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
