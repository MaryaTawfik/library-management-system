
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
// const jwt = require('jsonwebtoken');


// const isAuthenticated = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   if (!authHeader) return res.status(401).json({ message: 'No token provided' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Invalid token format' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Invalid or expired token' });
//     req.user = decoded;
//     next();
//   });
// };


// const isStudent = (req, res, next) => {
//   if (!req.user || req.user.role !== 'student') {
//     return res.status(403).json({ message: 'Access denied: Students only' });
//   }
//   next();
// };


// const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== 'Admin') {
//     return res.status(403).json({ message: 'Access denied: Admins only' });
//   }
//   next();
// };

// module.exports = {
//   isAuthenticated,
//   isStudent,
//   isAdmin,
// };