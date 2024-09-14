
const mongoose = require ("mongoose")

const cartSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    items: [{
      product:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
  },
        quantity: {
            type: Number,
            required: true,
            default: 1
          },
          total: {
            type: Number,
            required: true
          },
          
          Price: {
            type: Number,
            required: true
          },
          honeyName: {
            type: String,
            required: true
          },
          productPicture: {
            type: String,
      
          }
    }],
    cashBack: {
      type: Number,
    },
    grandTotal:{
      type:Number,
    required:true,
    default:0
    }
})
const CartModel = mongoose.model("carts", cartSchema)
module.exports = CartModel


