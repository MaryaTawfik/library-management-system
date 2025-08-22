const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const Role = require('../middlewares/role');
const authMiddleware = require('../middlewares/auth');

router.get('/', bookController.getAll);
router.get('/:id', bookController.getOne);
router.post('/', authMiddleware, Role.isAdmin, bookController.create);
router.patch('/:id', authMiddleware, Role.isAdmin, bookController.update);
router.delete('/:id', authMiddleware, Role.isAdmin, bookController.remove);

module.exports = router;