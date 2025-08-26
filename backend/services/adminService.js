const User = require('../models/users');

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};