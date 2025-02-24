const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
let URI = process.env.URI
mongoose.connect(URI).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err)
})

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
