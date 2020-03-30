const router = require('express').Router()
const controller = require('../controllers/todo_controller.js')

router.get('/', controller.findAll)
router.get('/:id', controller.findByPk)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router