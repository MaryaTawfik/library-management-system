const express = require("express");
const { body } = require("express-validator");
const User = require("../models/users");
const authController = require("../controllers/auth_controller");
const { isAuthenticated } = require("../middlewares/authenticate");
const { parser, singleUpload } = require("../middlewares/multer");
const { isStudent } = require("../middlewares/role");
const validate = require("../middlewares/validate");
const router = express.Router();

const registerValidation = [
  body("userID").notEmpty().withMessage("User ID is required"),

  body("firstName")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name must be 3–20 characters long"),

  body("lastName")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name must be 3–20 characters long"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((value) => {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
      if (!regex.test(value)) {
        throw new Error(
          "Password must include at least one number and one special character"
        );
      }
      return true;
    }),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post(
  "/register",
  parser.single("profileImage"),
  registerValidation,
  validate,
  authController.register
);

router.post("/login", loginValidation, validate, authController.login);
router.put(
  "/profile",
  isAuthenticated,
  singleUpload("profileImage"),
  authController.updateProfile
);
router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Valid email is required"),
  validate,
  authController.forgotPassword
);
router.post(
  "/reset-password/:token",
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must include at least one number and one special character"
    ),
  validate,
  authController.resetPassword
);
router.put(
  "/change-password",
  isAuthenticated,
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage(
      "New password must include at least one number and one special character"
    ),
  validate,
  authController.changePassword
);

router.get("/verify/:token", authController.verifyEmail);
router.get("/verify-manual/:token", authController.verifyEmail);

// router.get("/verify-email/:token", authController.verifyEmail);
module.exports = router;
