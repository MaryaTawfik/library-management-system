
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const Role = require("../middlewares/role");
const authMiddleware = require("../middlewares/authenticate");
const parser = require("../middlewares/multer");

router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);
router.post(
  "/",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  parser.single("imageUrl"),
  bookController.create
);

const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const Role = require('../middlewares/role');
const authMiddleware = require('../middlewares/authenticate');
const parser = require('../middlewares/multer');


router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post(
  '/',
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  parser.single('imageUrl'), 
  bookController.create
);

router.patch('/:id', authMiddleware.isAuthenticated, Role.isAdmin, bookController.update);
router.delete('/:id', authMiddleware.isAuthenticated, Role.isAdmin, bookController.remove);


router.patch(
  "/:id",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  bookController.update
);
router.delete(
  "/:id",
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  bookController.remove
);

module.exports = router;
