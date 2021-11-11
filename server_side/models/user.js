const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')
// const saltRounds = 10;
const jwt = require('jsonwebtoken');

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

// userSchema.pre('save', ( next ) => {
//     var user = this;
    

//         bcrypt.genSalt(saltRounds, (err, salt) => {
//             if (err) return next(err);
    
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) return next(err);
//                 user.p
//                 next();
//             })
//         })  
// })


userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


const User = mongoose.model('User', userSchema);
module.exports = { User }