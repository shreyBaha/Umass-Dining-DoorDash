const asyncHandler = require('express-async-handler')
const Dining = require('../models/diningModel')

const getDiningInfo = asyncHandler(async (req, res) => {
  const info = await Dining.find()

  res.status(200).json(info)
})

const createDining = asyncHandler(async (req, res) => {
  if (!req.body.dining_hall) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const dining = await Dining.create({
    dining_hall: req.body.dining_hall,
    lunch: req.body.lunch,
    dinner: req.body.dinner,
    latenight: req.body.latenight,
  })

  res.status(200).json(dining)
})
module.exports = {
  getDiningInfo,
  createDining
}