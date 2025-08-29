const jwt = require('jsonwebtoken');
const User = require('../models/users');

const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (user.status === 'blocked') return res.status(403).json({ message: 'Account is blocked. Contact admin.' });

    if (user.expiryDate && user.expiryDate < new Date() && user.is_member) {
      user.is_member = false;
      await user.save();
      console.log(`Membership expired for user: ${user.email}`);
    }

    req.user = user;
    console.log('Authenticated user:', req.user.email, `(${req.user.role})`);
    return next();
  } catch (err) {
    console.error('Authentication error:', err.message || err);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { isAuthenticated };
