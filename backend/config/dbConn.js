const mongoose = require('mongoose')
const connectDB = async() => {
  try{
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true, //just some options to prevent MongoDB warnings
      useNewURlParser: true
    })
  }catch(err){
    console.log(err)
  }
}
module.exports = connectDB