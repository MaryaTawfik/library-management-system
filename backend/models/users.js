const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const usersSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    department: { type: String, trim: true },
    phoneNumber: { type: Number, required: true },
    acadamicYear: {
      type: Date,
      trim: true,
      enum: ["1st", "2nd", "3rd", "4th", "5th"],
    },
    gender: { type: String, trim: true, enum: ["male", "female"] },
    role: {
      type: String,
      trim: true,
      enum: ["Admin", "student"],
      default: "student",
      required: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ["blocked", "active"],
      default: "active",
    },
    is_member: { type: Boolean, required: true },
    expiryDate: { type: Date, required: true },
    profileImage: {
      type: String,
      trim: true,
      default: "https://via.placeholder.com/150",
    },
  },
  { timestamps: true }
);

const usersSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  firstName: { type: String, minlength: 3, maxlength: 20, required: true, trim: true },
  lastName: { type: String, minlength: 3, maxlength: 20, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  department: { type: String, trim: true },
  phoneNumber: { type: Number, required: true },
  acadamicYear: { type: Date, trim: true, enum: ['1st', '2nd', '3rd', '4th', '5th'] },
  gender: { type: String, trim: true, enum: ['male', 'female'] },
  role: { type: String, trim: true, enum: ['Admin', 'student'], default: 'student', required: true },
  status: { type: String, trim: true, enum: ['blocked', 'active'], default: 'active' },
  is_member: { type: Boolean, required: true },
  expiryDate: { type: Date, required: true }
  ,
  profileImage: { type: String, trim: true, default: 'https://via.placeholder.com/150' }
}, { timestamps: true });


usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", usersSchema);
