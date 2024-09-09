
const mongoose = require ("mongoose")

const ProductSchema = new mongoose.Schema({
    
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
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmers',
      required: true
    },
})
const ProductModel = mongoose.model("Products", ProductSchema)
module.exports = ProductModel


