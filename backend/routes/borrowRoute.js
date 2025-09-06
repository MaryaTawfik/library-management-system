const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");
const Role = require("../middlewares/role");
const authMiddleware = require("../middlewares/authenticate");

router.post(
  "/borrow/:bookId",
  authMiddleware.isAuthenticated,
  borrowController.borrowBook
);

router.get(
  "/borrow/history/:userId",
  authMiddleware.isAuthenticated,
  borrowController.getBorrowHistory
);
router.get(
  "/borrow/all",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  borrowController.getAllBorrows
);
router.get(
  "/borrow/active",
  authMiddleware.isAuthenticated,
  borrowController.getActiveBorrows
);
router.delete(
  "/borrow/:borrowId",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  borrowController.deleteBorrow
);

router.put(
  "/return/request/:borrowId",
  authMiddleware.isAuthenticated,
  borrowController.requestReturn
);
router.put(
  "/return/approve/:borrowId",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  borrowController.approveReturn
);

router.put(
  "/return/reject/:borrowId",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  borrowController.rejectReturn
);
router.get(
  "/borrow/pending",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  borrowController.getPendingReturns
);
router.get(
  "/overdue/users",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  borrowController.getOverdueUsers
);
router.get("/returned/overdue", borrowController.getReturnedOverdueUsers);

module.exports = router;
