import API from "./api";

const MOCK_USERS = [
  {
    _id: "1",
    name: "John Student",
    email: "student@library.com",
    avatar: "https://i.pravatar.cc/100?u=1",
    membership: { status: "active", expires: "2025-09-25" },
    joinDate: "2025-05-28",
    borrowings: { total: 15, current: 2 },
    role: "student",
    status: "active",
  },
  {
    _id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/100?u=2",
    membership: { status: "inactive", expires: null },
    joinDate: "2022-08-10",
    borrowings: { total: 5, current: 0 },
    role: "student",
    status: "blocked",
  },
];

// Fetch all users
export const getAllUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    return res.data || [];
  } catch (err) {
    console.warn("usersService.getAllUsers failed:", err.message);
    return []; // fallback empty array
  }
};

// Toggle block/unblock
export const toggleUserBlock = async (id, block = true) => {
  try {
    const url = `/admin/users/${id}/${block ? "block" : "unblock"}`;
    const res = await API.put(url);
    return res.data; // backend returns { message, data }
  } catch (err) {
    console.error("toggleUserBlock failed:", err.response?.data || err.message);
    throw err; // propagate error to handle in UI
  }
};
