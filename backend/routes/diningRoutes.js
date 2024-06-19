const express = require('express')
const router = express.Router()
const {
  getDiningInfo,
  createDining,
} = require('../controllers/diningController')


router.route('/').get(getDiningInfo).post(createDining)

module.exports = router