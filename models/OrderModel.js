const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  items: [{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    honeyName:{
      type: String,
      required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price:{
        type: String,
        required: true
    },
    productPicture:{
        type: String
    },
}],
  totalAmount: {
      type: Number,
  },
  customerFirstName: {
      type: String,
      required: true
  },
  customerLastName: {
      type: String,
      required: true
  },
  customerAddress:{
    type: String,
    required: true
  },
  customerPhoneNumber: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: 'Nigeria'
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Delivered'],
    default: 'Processing'
  },
  orderDate: {
    type: Date,
    default: Date.now
 }
  
}, { timestamps: true });


const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel