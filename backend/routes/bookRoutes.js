const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authenticate');

const { uploadBookImage } = require('../middlewares/multer');

const Role = require('../middlewares/role');
const parser = require('../middlewares/multer');


router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post(
  '/',
  authMiddleware.isAuthenticated,

  uploadBookImage,

  Role.isAdmin,
  parser.single('imageUrl'),  // keep the field name your controller expects

  bookController.create
);

module.exports = router;
