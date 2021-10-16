const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExpiry: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema);
module.exports = { User }