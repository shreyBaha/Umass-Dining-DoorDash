const express = require('express')
const router = express.Router()
const {
  getDiningInfo,
} = require('../controllers/diningController')


router.route('/').get(getDiningInfo)

module.exports = router