const router = require('express').Router()
const controller = require('../controllers/todo_controller.js')
const autentication = require('../middleware/autentication.js')
const autorization = require('../middleware/autorization.js')

router.use(autentication)
router.get('/', controller.findAll)
router.post('/', controller.create)
router.get('/:id', autorization, controller.findByPk)
router.put('/:id', autorization, controller.update)
router.delete('/:id', autorization, controller.delete)

module.exports = router