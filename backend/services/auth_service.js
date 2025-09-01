const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcrypt');

const registeruser = async (data) => {
  const newUser = new User(data);
  await newUser.save();
  return await User.findById(newUser._id).select('-password');
};

const loginuser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign(
    {
      id: user._id,
      userID: user.userID,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
      phoneNumber: user.phoneNumber,
      is_member: user.is_member,
      gender: user.gender,
      acadamicYear: user.acadamicYear,
      status: user.status,
      profileImage: user.profileImage,
      expiryDate: user.expiryDate,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  const sanitizedUser = await User.findById(user._id).select('-password');
  return { token, user: sanitizedUser };
};

const updateUserProfile = async (id, data) => {
  const forbiddenFields = ['status', 'is_member', 'expiryDate', 'role'];
  forbiddenFields.forEach((field) => delete data[field]);

  
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) throw new Error('User not found');
  return user;
};

module.exports = { registeruser, loginuser, updateUserProfile };
