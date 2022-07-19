const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  roles:{
    User: {
      type: Number,
      default: 2001,
      required: true
    },
    Admin: Number
  },
  password: {
    type: String,
    required: true
  },
  passwordUnencrypted: String,
  refreshToken: String
})

module.exports = mongoose.model('User', userSchema)