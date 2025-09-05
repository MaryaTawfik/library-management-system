const adminService = require("../services/adminService");

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ data: users });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message:
        "Unable to fetch user data at this time. Please try again later.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await adminService.updateUser(req.params.id, req.body);
    res.json({ message: "User updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const blockUser = async (req, res) => {
  try {
    const blockedUser = await adminService.blockUser(req.params.id);
    res.json({ message: "User blocked successfully", data: blockedUser });
  } catch (err) {
    res.status(500).json({ message: "Block failed", error: err.message });
  }
};

const unblockUser = async (req, res) => {
  try {
    const unblockedUser = await adminService.unblockUser(req.params.id);
    res.json({ message: "User unblocked successfully", data: unblockedUser });
  } catch (err) {
    res.status(500).json({ message: "Unblock failed", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
const getBlockedUsers = async (req, res) => {
  try {
    const blockedUsers = await adminService.getBlockedUsers();
    res.json({
      message: "Blocked users retrieved successfully",
      data: blockedUsers,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch blocked users", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  getBlockedUsers,
};
