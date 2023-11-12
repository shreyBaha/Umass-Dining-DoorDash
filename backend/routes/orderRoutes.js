const express = require('express')
const router = express.Router()
const {
  getOrder,
  createOrder,
  deleteOrder,
} = require('../controllers/orderController')


router.route('/').get(getOrder).post(createOrder)
router.route('/:id').delete(deleteOrder)

module.exports = router