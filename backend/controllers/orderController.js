const asyncHandler = require('express-async-handler')

const Order = require('../models/orderModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })

  res.status(200).json(orders)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const order = await Order.create({
    dining_hall: req.body.text,
    food: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(order)
})



// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (order.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await order.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getOrder,
  createOrder,
  deleteOrder,
}