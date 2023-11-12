const asyncHandler = require('express-async-handler')
const Dining = require('../models/diningModel')

const getDiningInfo = asyncHandler(async (req, res) => {
  const info = await Dining.find()

  res.status(200).json(info)
})
module.exports = {
  getDiningInfo,
}