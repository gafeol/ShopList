const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    googleId: String
})

const User = mongoose.model('user', userSchema)

new User({
    username: "ab",
    googleId: '1231'
}).save().then((newUser)=>{
    console.log('novo usuario', newUser)
})

module.exports = User;