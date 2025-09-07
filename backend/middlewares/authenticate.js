
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.expiryDate && user.expiryDate < new Date()) {
      if (user.is_member) {
        user.is_member = false;
        await user.save();
        console.log(`Membership expired for user: ${user.email}`);
      }
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

module.exports = { isAuthenticated };
