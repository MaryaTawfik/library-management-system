// const express = require('express');
// const router =express.Router();
// const authcontroller =  require('../controllers/auth_controller')


// router.post('/register',authcontroller.register);
// router.post('/login',authcontroller.login);

// module.exports = router;
const express = require('express');
const { body } = require('express-validator');
const User = require('../models/users'); 
const authController = require('../controllers/auth_controller');
const { isAuthenticated } = require('../middlewares/authenticate')
const parser = require('../middlewares/multer')
const {  isStudent } = require('../middlewares/role');
const router = express.Router();

const registerValidation = [
  body('userID')
    .notEmpty()
    .withMessage('User ID is required'),

  body('firstName')
    .isLength({ min: 3, max: 20 })
    .withMessage('First name must be 3–20 characters long'),

  body('lastName')
    .isLength({ min: 3, max: 20 })
    .withMessage('Last name must be 3–20 characters long'),

  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((value) => {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (!regex.test(value)) {
        throw new Error('Password must include at least one number and one special character');
      }
      return true;
    }),

  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Invalid phone number'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.put('/profile', isAuthenticated, isStudent, parser.single('profileImage'), authController.updateProfile);
module.exports = router;
