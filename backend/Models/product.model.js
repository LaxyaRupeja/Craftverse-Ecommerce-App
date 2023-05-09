const mongoose = require('mongoose');
const prodSchema = mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    image2: String,
    desc: String,
    category: { type: String, enum: ["Saree", "Kurta", "Home-Decor"] }
}, {
    versionKey: false
})
const ProductModel = mongoose.model("product", prodSchema)
module.exports = { ProductModel }