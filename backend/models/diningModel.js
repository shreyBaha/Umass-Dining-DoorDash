const mongoose = require('mongoose')

const diningSchema = mongoose.Schema(
  {
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

module.exports = mongoose.model('Dining', diningSchema)