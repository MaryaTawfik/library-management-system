const express = require('express')
const router = express.Router()
const borrowController = require('../controllers/borrowController')
const Role = require('../middlewares/role');
const authMiddleware = require('../middlewares/authenticate');

router.post('/borrow/:bookId' , authMiddleware.isAuthenticated , borrowController.borrowBook)
router.put('/return/:borrowId', authMiddleware.isAuthenticated, borrowController.returnBook);
router.get('/borrow/history/:userId',authMiddleware.isAuthenticated , borrowController.getBorrowHistory);
router.get('/borrow/all', authMiddleware.isAuthenticated ,Role.isAdmin , borrowController.getAllBorrows);
router.get("/borrow/active", authMiddleware.isAuthenticated, borrowController.getActiveBorrows);
router.delete(
  "/borrow/:borrowId",
  authMiddleware.isAuthenticated,
  Role.isAdmin,          // only admins can delete
  borrowController.deleteBorrow
);

module.exports = router;