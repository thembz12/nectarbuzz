const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users', 
    required: true 
  }],
  total: { 
    type: Number, 
    required: true 
  },
  customerName: { 
    type: String, 
    required: true 
  },
  customerAddress: { 
    type: String, 
    required: true 
  },
  cashBackUsed: { 
    type: Number, 
    default: 0 
  },
  isPaid: { 
    type: Boolean, 
    default: false 
},
  orderDate: { 
    type: Date, 
    default: Date.now()
  }
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel