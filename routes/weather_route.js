const express = require('express')
const router = express.Router()

const controller = require('../controllers/weather_controller')

router.get('/', controller.dashboard )

router.post('/weather', controller.weather_call)

router.get('/view-weather', controller.view_weather)

module.exports = router