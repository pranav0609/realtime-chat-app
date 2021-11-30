const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 30
    },
    email: {
        type: String,
        unique: 1
    },
    Message: {
        type: String,
        minlength: 5
    }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = { Message }