const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const Role = require('../middlewares/role');
const authMiddleware = require('../middlewares/authenticate');
const parser = require('../utils/multer')

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/', parser.single('image'), authMiddleware.isAuthenticated, Role.isAdmin, bookController.create);
router.patch('/:id', authMiddleware.isAuthenticated, Role.isAdmin, bookController.update);
router.delete('/:id', authMiddleware.isAuthenticated, Role.isAdmin, bookController.remove);

module.exports = router;