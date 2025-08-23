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

module.exports = { isStudent, isAdmin };

