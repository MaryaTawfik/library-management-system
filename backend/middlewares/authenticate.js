
const jwt = require('jsonwebtoken');
const User = require('../models/users'); 


const isAuthenticated = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id); 
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Not a student.' });
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        return next();
    }
    res.status(403).json({ message: 'Access denied. Not an admin.' });
};

module.exports = { isAuthenticated, isStudent, isAdmin };