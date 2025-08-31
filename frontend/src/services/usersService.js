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

export const getAllUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    return res.data || [];
  } catch (err) {
    console.warn(
      "usersService.getAllUsers failed, returning mock",
      err.message
    );
    return MOCK_USERS;
  }
};

export const toggleUserBlock = async (id) => {
  try {
    const res = await API.post(`/admin/users/${id}/block`);
    return res.data;
  } catch (err) {
    console.warn(
      "usersService.toggleUserBlock failed, updating mock",
      err.message
    );
    // mimic toggle for mock
    const user = MOCK_USERS.find((u) => u._id === id);
    if (user) user.status = user.status === "active" ? "blocked" : "active";
    return { success: true };
  }
};
