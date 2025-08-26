const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { isAuthenticated } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/role');

router.get('/users', isAuthenticated, isAdmin, adminController.getAllUsers);
router.put('/users/:id', isAuthenticated, isAdmin, adminController.updateUser);
router.delete('/users/:id', isAuthenticated, isAdmin, adminController.deleteUser);

module.exports = router;