const { schema } = require("@hapi/joi/lib/compile")
const mongoose = require ("mongoose")

const cartSchema = new schema.mongoose({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    user: {
      
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
  },

    product:[{
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

    grandTotal:{type:Number,
    default:0
    }
})
const CartModel = mongoose.model("carts", cartSchema)
exports.module = CartModel


