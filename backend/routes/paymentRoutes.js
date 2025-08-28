const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { isAuthenticated } = require('../middlewares/authenticate');
const { isAdmin, isStudent } = require('../middlewares/role');
const parser = require('../middlewares/multer');

router.post('/', isAuthenticated, isStudent,parser.single('paymentProof'), paymentController.createpayment);
router.get('/:userId', isAuthenticated, paymentController.getuserpayment);
router.get('/', isAuthenticated, isAdmin, paymentController.getAllpayments);
router.put('/:id', isAuthenticated, isAdmin, paymentController.updatepaymentstatus);

module.exports = router;
