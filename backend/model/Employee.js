const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema
const employeeSchema = new Schema({
  firstname: {
    type: String, 
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
})

//model
module.exports = mongoose.model('Employee', employeeSchema)