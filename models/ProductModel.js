const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  honeyName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  productStatus: {
    type: String,
    enum: ["pending", "approved"],
    default: "approved",
  },
  productPicture: {
    type: String,
  },
  farmers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmers",
    // required: true,
  },
});
const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;
