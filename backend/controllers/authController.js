const User = require('../model/User')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req, res) => {
  const { pwd } = req.body;
  if (!pwd) return res.status(400).json({ 'message': 'Password is required.' });
  console.log(pwd)
  const foundUser = await User.findOne({passwordUnencrypted: pwd}) //required for findOne in async functions
  if (!foundUser) return res.status(401).json({'message': 'Matching password could not be found'}); //Unauthorized 
  // evaluate password 
  console.log(foundUser)
  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log(match)
  if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean)
      // create JWTs
      const accessToken = jwt.sign(
          { 
            "UserInfo": {
                "passwordUnecrypted": foundUser.passwordUnencrypted,
                "roles": roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1d' }
        );
      const refreshToken = jwt.sign(
          { "username": foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = refreshToken
      const results = await foundUser.save()
      console.log(results)
     
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000 });//secure: true, //refresh token takes a day to expire, in the form of http cookie
      res.json({roles, accessToken }); //access token is expiring quick
  } else {
      res.status(401).json({'message': 'User not found'});
  }
}

module.exports = { handleLogin };