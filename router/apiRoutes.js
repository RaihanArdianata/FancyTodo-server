const router = require('express').Router()
const controller = require('../controllers/global_api_controller.js')

router.get('/getCovidReportAll', controller.getAll)
router.get('/covid/:country', controller.getByCountry)

module.exports = router