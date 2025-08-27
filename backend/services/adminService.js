const User = require('../models/users');

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

const blockUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { status: 'blocked' }, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

const unblockUser = async (id) => {
  const user = await User.findByIdAndUpdate(id, { status: 'active' }, { new: true });
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
  deleteUser,
  blockUser,
  unblockUser
};