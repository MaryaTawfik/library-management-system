const authService = require('../services/auth_service');

const register = async (req, res) => {
  try {
    const { userID, firstName, lastName, email, password, phoneNumber } = req.body;

    // Prevent clients from creating Admin accounts by insisting any requested role of 'Admin' is rejected
    if (req.body && req.body.role === 'Admin') {
      return res.status(403).json({ message: 'Cannot register as Admin. Admin account is fixed.' });
    }

    const data = {
      userID,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role: 'student', // assign default role server-side
      is_member: true,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };

    if (!data.userID || !data.firstName || !data.lastName || !data.email || !data.password || !data.phoneNumber) {
      return res.status(400).json({ message: 'Missing required user data' });
    }

    const user = await authService.registeruser(data);
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
