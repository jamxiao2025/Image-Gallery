//import Mongo Database
const User = require('../model/User')

const jwt = require('jsonwebtoken');
require('dotenv').config();
//i don't get where the cookie is currently stored http
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  //optional chaining "?." so check if there are cookies, and then if there is jwt property
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies)
  console.log(cookies.jwt)
  const refreshToken = cookies.jwt //i don't get this
  const foundUser = await User.findOne({refreshToken: refreshToken})
  if (!foundUser) return res.sendStatus(403); //Unauthorized 
  // evaluate jwt 
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded)=>{
      if( err || foundUser.passwordUnencrypted !== decoded.passwordUnencrypted) return res.sendStatus(403) //username is encoded in token
      const roles = Object.values(foundUser.roles)
      const accessToken = jwt.sign(
        {
            "UserInfo": {
              "passwordUnencrypted": decoded.passwordUnencrypted,
              "roles": roles
             }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s'}
      )
      res.json({accessToken})
    }
  )
}

module.exports = { handleRefreshToken };