const jwt = require("jsonwebtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// const registeruser = async (data) => {
//   // create user but mark unverified and generate a verification token
//   const verificationToken = crypto.randomBytes(32).toString("hex");
//   const verificationTokenHash = crypto
//     .createHash("sha256")
//     .update(verificationToken)
//     .digest("hex");

//   // ensure new users are created unverified by default
//   data.isVerified = false;
//   data.verificationToken = verificationTokenHash;
//   data.verificationExpires = Date.now() + 24 * 60 * 60 * 1000; 

//   const newUser = new User(data);
//   await newUser.save();

//   const sanitizedUser = await User.findById(newUser._id).select("-password");

//   // build verification urls
//   // Primary: backend URL that directly hits the verify route so clicking the link
//   // will immediately verify the user. Additionally include a frontend-friendly
//   // link (if provided) so a deployed frontend can optionally exchange the token
//   // with the backend via an API call.
//   const backendVerifyBase = process.env.BACKEND_URL || `http://localhost:5000`;
//   const verificationUrl = `${backendVerifyBase}/auth/verify/${verificationToken}`;

//   const frontendBaseRaw = process.env.BASE_URL || process.env.CLIENT_URL || ""; // may include /login
//   let frontendVerificationUrl = null;
//   if (frontendBaseRaw) {
//     const frontendBase = frontendBaseRaw.replace(/\/$/, '');
//     // If the base already points to login page, append the token as a query param
//     if (frontendBase.match(/\/login(\/?$|\?|$)/)) {
//       frontendVerificationUrl = `${frontendBase}${frontendBase.includes('?') ? '&' : '?'}verifyToken=${verificationToken}`;
//     } else {
//       // otherwise point to the login path with token param
//       frontendVerificationUrl = `${frontendBase}/login?verifyToken=${verificationToken}`;
//     }
//   }

//   console.log("Email verification URL (backend):", verificationUrl);
//   if (frontendVerificationUrl) console.log("Email verification URL (frontend):", frontendVerificationUrl);

//   // send verification email if mail credentials provided
//   let emailSent = false;
//   if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//     });

//     let htmlBody = `<p>Click <a href="${verificationUrl}">this link</a> to verify your email (this will directly call the backend).</p>
//              <p>If that doesn't work in your environment, copy and paste this backend URL into your browser:</p>
//              <p>${verificationUrl}</p>`;

//     if (frontendVerificationUrl) {
//       htmlBody += `<hr/><p>Or, if you are using the frontend app, click this link (the frontend may exchange the token with the backend):</p>
//                    <p><a href="${frontendVerificationUrl}">${frontendVerificationUrl}</a></p>`;
//     }

//     try {
//       // verify transporter configuration early to get clearer errors
//       await transporter.verify();
//       await transporter.sendMail({
//         to: newUser.email,
//         subject: "Verify your email",
//         html: htmlBody,
//       });
//       console.log('Verification email sent to', newUser.email);
//       emailSent = true;
//     } catch (err) {
//       // Log full error for debugging (do not expose in production responses)
//       console.error('Failed sending verification email:', err && (err.stack || err.message || err));
//       console.error('SMTP config user:', process.env.EMAIL_USER ? process.env.EMAIL_USER : '(none)');
//       // Keep going — user is created and token is logged above so manual verification is possible
//       emailSent = false;
//     }
//   } else {
//     // No email credentials — make it easy to test by logging the URLs
//     console.warn('EMAIL_USER or EMAIL_PASS not set. Verification email will not be sent automatically.');
//   }

//   // Return additional info to make testing easier locally: the backend and frontend URLs
//   return { user: sanitizedUser, verificationUrl, frontendVerificationUrl, emailSent };
// };
const  registeruser = async (data) => {
  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenHash = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Ensure new users are unverified by default
  data.isVerified = false;
  data.verificationToken = verificationTokenHash;
  data.verificationExpires = Date.now() + 24 * 60 * 60 * 1000; 

  const newUser = new User(data);
  await newUser.save();

  const sanitizedUser = await User.findById(newUser._id).select("-password");

  // Build verification URL
  const backendVerifyBase = process.env.BACKEND_URL || `http://localhost:5000`;
  const verificationUrl = `${backendVerifyBase}/auth/verify/${verificationToken}`;
  console.log("Email verification URL (for testing):", verificationUrl);

  // Send verification email if credentials provided
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      to: newUser.email,
      subject: "Verify your email",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>
             <p>If the above link doesn't work, copy and paste this URL into your browser:</p>
             <p>${verificationUrl}</p>`,
    });
  }

  return sanitizedUser;
};
const loginuser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  if (user.isVerified === false) throw new Error("Email not verified. Please verify your email before logging in.");

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

// const verifyEmail = async (token) => {
//   const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
//   const user = await User.findOne({
//     verificationToken: tokenHash,
//     verificationExpires: { $gt: Date.now() },
//   });

//   if (!user) throw new Error("Invalid or expired verification token");

//   user.isVerified = true;
//   user.verificationToken = undefined;
//   user.verificationExpires = undefined;
//   await user.save();
  
//   return { success: true, message: "Email verified successfully" };
// };

const verifyEmail = async (token) => {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    verificationToken: tokenHash,
    verificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    return { success: false, message: "Invalid or expired token." };
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationExpires = undefined;
  await user.save();

  return { success: true };
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
    process.env.BASE_URL || "http://localhost:3000"
  }/reset-password/${resetToken}`;
  console.log("Reset URL (for testing):", resetUrl);

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    try {
      await transporter.verify();
      await transporter.sendMail({
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
      });
      console.log('Password reset email sent to', user.email);
    } catch (err) {
      console.error('Failed sending password reset email:', err && (err.stack || err.message || err));
    }
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
  verifyEmail,
};
