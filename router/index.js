const router = require('express').Router()
const todo = require('./todo.js')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome' })
})

router.use('/todo', todo)

module.exports = router