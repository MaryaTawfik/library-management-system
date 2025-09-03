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
  Role.isAdmin,
  uploadBookImage,
  
  bookController.create
);

router.patch(
  '/:id',
  authMiddleware.isAuthenticated,
  Role.isAdmin,
  uploadBookImage, 
  bookController.update
);

router.delete('/:id', authMiddleware.isAuthenticated, Role.isAdmin, bookController.remove);

module.exports = router;
