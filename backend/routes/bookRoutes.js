const express = require('express')
const router = express.Router()
const bookController=require('../controllers/bookController')

router.get('/' , bookController.getAll);
router.get('/:id' , bookController.getOne);
router.post('/' , bookController.create);
router.patch('/:id' , bookController.update);
router.delete('/:id' , bookController.remove);

module.exports=router;