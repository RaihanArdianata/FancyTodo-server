const router = require('express').Router()
const controller = require('../controllers/global_api_controller.js')

router.get('/getCovidReportAll', controller.getAll)

module.exports = router