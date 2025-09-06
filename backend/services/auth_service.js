const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const registeruser = async (data) => {
  const newUser = new User(data);
  await newUser.save();
  return await User.findById(newUser._id).select("-password");
};

const loginuser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

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
    { expiresIn: "30d" }
  );

  const sanitizedUser = await User.findById(user._id).select("-password");
  return { token, user: sanitizedUser };
};

const updateUserProfile = async (id, data) => {
  const forbiddenFields = ["status", "is_member", "expiryDate", "role"];
  forbiddenFields.forEach((field) => delete data[field]);

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new Error("User not found");
  return user;
};

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  const resetUrl = `${
    process.env.CLIENT_URL || "http://localhost:3000"
  }/reset-password/${resetToken}`;
  console.log("Reset URL (for testing):", resetUrl);

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });
  }

  return { message: "Password reset email sent", resetToken };
};

const resetPassword = async (token, newPassword) => {
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  return { message: "Password reset successful" };
};
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error("Current password is incorrect");

  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

module.exports = {
  registeruser,
  loginuser,
  updateUserProfile,
  requestPasswordReset,
  resetPassword,
  changePassword,
};
