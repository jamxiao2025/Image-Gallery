//controller to help with registration routing
const User = require('../model/User')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')

//define handler for new user information 
const handleNewUser = async (req, res) => {
  const { pwd } = req.body
  console.log(pwd)
  if(!pwd) return res.status(400).json({'message': 'Password is Required..'})
  //check for duplicate usernames in the db
  //const duplicate = await User.findOne({username: user}).exec() //required for findOne in async functions
  //if(duplicate){
 //   return res.status(409)
  //}
  try{
    //encrypt the password 
    const hashedPwd = await bcrypt.hash(pwd, 10) //10 salt rounds to make more secure
    //create and store the new user
    const result = await User.create({
      "password": hashedPwd,
      "passwordUnencrypted": pwd
      //Roles are implemented by default and Object ID is same
    })
    console.log(result)
    res.status(201).json({'success': `New password ${pwd} created.`})
  } catch (err){
    res.status(500).json({'message': err.message})
  }
}

module.exports = {handleNewUser}