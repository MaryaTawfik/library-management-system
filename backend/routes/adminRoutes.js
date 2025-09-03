const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { isAuthenticated } = require('../middlewares/authenticate');
const { isAdmin } = require('../middlewares/role');

router.get('/users', isAuthenticated, isAdmin, adminController.getAllUsers);

router.delete('/users/:id', isAuthenticated, isAdmin, adminController.deleteUser);


router.put('/users/:id/block', isAuthenticated, isAdmin, adminController.blockUser);
router.put('/users/:id/unblock', isAuthenticated, isAdmin, adminController.unblockUser);
router.get('/users/blocked', isAuthenticated, isAdmin, adminController.getBlockedUsers);


module.exports = router;