
const mongoose = require ("mongoose")

const ProductSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmers',
        required: true
      },
    honeyName:{
    type:String
    },
    price:{
    type:Number
    },
    description:{
    type:String
    },
    productPicture: {
      pictureUrl: { type: String},
    },
})
const ProductModel = mongoose.model("Products", ProductSchema)
module.exports = ProductModel


