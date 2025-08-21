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
    { id: user.userID, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '3m' }
  );

  return { token, user };
};

module.exports = { registeruser, loginuser };
