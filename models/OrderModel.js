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
  currentAddress:{
    type: String,
    required: true
  },
  customerPhoneNumber: {
    type: String
  },
  city: {
    type: String,
    
  },
  // cashBack:{type:String,
  //   default:0
  // },
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