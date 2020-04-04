const router = require('express').Router()
const todo = require('./todo.js')
const api_routes = require('./apiRoutes.js')
const user_controller =  require('../controllers/user_controller.js')

router.post('/signup', user_controller.signup)
router.post('/signin', user_controller.signin)
router.get('/user', user_controller.findAll)
router.post('/googleSign', user_controller.googleAcount)

router.use('/todo', todo)
router.use('/api', api_routes)

module.exports = router