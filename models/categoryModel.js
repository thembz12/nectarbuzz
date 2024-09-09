const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    Product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }],
})


const categoryModel = mongoose.model('Category', categorySchema);

module.exports = categoryModel