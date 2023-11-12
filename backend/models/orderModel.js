const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dining_hall: {
      type: String,
      required: [true, 'Please select dining hall'],
    },
    food: {
      type: Array,
      required: [true, 'Please select food items']
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', orderSchema)