const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dining_hall: {
      type: String,
      required: [true, 'Please select dining hall'],
    },
    lunch: {
      type: Array,
      required: [true, 'Please select food items']
    },
    dinner: {
      type: Array,
      required: [true, 'Please select food items']
    },
    latenight: {
      type: Array
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Dining', orderSchema)