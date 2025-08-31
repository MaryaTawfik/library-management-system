
const User = require("../models/users");

const getAllUsers = async () => {
  return await User.find({ role: { $ne: "Admin" } }).select("-password");
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select(
    "-password"
  );
  if (!user) throw new Error("User not found");

const User = require('../models/users');

const getAllUsers = async () => {
  return await User.find({ role: { $ne: 'Admin' } }).select('-password');
};


const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
  if (!user) throw new Error('User not found');

  return user;
};

const blockUser = async (id) => {

  const user = await User.findByIdAndUpdate(
    id,
    { status: "blocked" },
    { new: true }
  );
  if (!user) throw new Error("User not found");

  const user = await User.findByIdAndUpdate(id, { status: 'blocked' }, { new: true });
  if (!user) throw new Error('User not found');

  return user;
};

const unblockUser = async (id) => {

  const user = await User.findByIdAndUpdate(
    id,
    { status: "active" },
    { new: true }
  );
  if (!user) throw new Error("User not found");

  const user = await User.findByIdAndUpdate(id, { status: 'active' }, { new: true });
  if (!user) throw new Error('User not found');

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) throw new Error("User not found");

  if (!user) throw new Error('User not found');

  return user;
};

const getBlockedUsers = async () => {

  return await User.find({ status: "blocked" }).select("-password");

  return await User.find({ status: 'blocked' }).select('-password');

};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  blockUser,

  unblockUser,
  getBlockedUsers,
};

  unblockUser
  ,getBlockedUsers
};


