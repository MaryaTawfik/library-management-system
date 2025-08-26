const adminService = require('../services/adminService');

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed', error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await adminService.updateUser(req.params.id, req.body);
    res.json({ message: 'User updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};