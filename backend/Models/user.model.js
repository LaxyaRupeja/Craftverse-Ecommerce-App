const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: [],
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    orderHist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
}, {
    versionKey: false
})
const UserModel = mongoose.model("user", userSchema)
module.exports = { UserModel }
