const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registeruser = async (data) => {
  const newUser = new User(data);
  await newUser.save();
  return newUser;
};

const loginuser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '30d' }
);


  return { token, user };
};
const updateUserProfile = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};
module.exports = { registeruser, loginuser, updateUserProfile };
