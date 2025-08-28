const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authenticate');
const Role = require('../middlewares/role');
const parser = require('../middlewares/multer');

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post(
  '/',
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  parser.single('imageUrl'),  // keep the field name your controller expects
  bookController.create
);

module.exports = router;
