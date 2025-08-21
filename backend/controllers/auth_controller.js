const authService = require('../services/auth_service');

const register = async (req, res) => {
  try {
    const { userID, firstName, lastName, email, password, phoneNumber, is_member, expiryDate } = req.body;

    if (!userID || !firstName || !lastName || !email || !password || !phoneNumber || is_member === undefined || !expiryDate) {
      return res.status(400).json({ message: 'Missing required user data' });
    }

    const user = await authService.registeruser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginuser(email, password);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };
