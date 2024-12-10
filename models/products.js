
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  description: { type: String },
  image: { type: String, required: false },
  quantity : { type: Number, required: true, default: 1 },
});

module.exports = mongoose.model('Product', productSchema);