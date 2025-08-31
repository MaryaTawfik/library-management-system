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
  }
};
