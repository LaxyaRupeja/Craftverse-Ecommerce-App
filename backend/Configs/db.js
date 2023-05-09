const mongoose = require('mongoose');
require('dotenv').config()
const connect = () => {
    mongoose.connect(process.env.mongoURL);
    console.log("Server Starting and Connected to Database :)")
}
module.exports = { connect }