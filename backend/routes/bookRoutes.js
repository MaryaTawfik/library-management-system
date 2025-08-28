const parser = require('../utils/multer');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const Role = require('../middlewares/roleMiddleware');
const router = require('express').Router();

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
