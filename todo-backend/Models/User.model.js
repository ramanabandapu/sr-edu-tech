const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = { UserModel }