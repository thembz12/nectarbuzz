const { schema } = require("@hapi/joi/lib/compile")
const mongoose = require ("mongoose")

const cartSchema = new schema.mongoose({
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
            required: true
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
exports.module = CartModel


