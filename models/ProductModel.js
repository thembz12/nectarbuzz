
const mongoose = require ("mongoose")

const ProductSchema = new mongoose.Schema({
    
    honeyName:{
    type:String
    },
    price:{
    type:Number
    },
    weight:{
      type:String
      },
    description:{
    type:String
    },
    productStatus:{type:String,
       enum:["pending", "approved"],
       default: "pending",
    },
    productPicture: {
      type: String
    },
    farmers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmers',
      required: true
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Category',
    //   required: true
    // },
})
const ProductModel = mongoose.model("Products", ProductSchema)
module.exports = ProductModel


