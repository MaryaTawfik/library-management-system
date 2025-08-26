
const jwt = require('jsonwebtoken');
const User = require('../models/users'); 


const isAuthenticated = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        req.user = await User.findById(decoded.id); 
        console.log('Authenticated user:', req.user);
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};



module.exports = { isAuthenticated};
