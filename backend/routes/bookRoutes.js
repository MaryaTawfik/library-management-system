const parser = require('../utils/multer');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authenticate');
const { uploadBookImage } = require('../middlewares/multer');
const Role = require('../middlewares/role');
const router = require('express').Router();

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post(
  '/',
  authMiddleware.isAuthenticated,
  uploadBookImage,
  Role.isAdmin,
  bookController.create
);

module.exports = router;
