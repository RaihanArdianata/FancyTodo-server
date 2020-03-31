const router = require('express').Router()
const todo = require('./todo.js')
const user_controller =  require('../controllers/user_controller.js')

router.post('/signup', user_controller.signup)
router.post('/signin', user_controller.signin)

router.use('/todo', todo)

module.exports = router