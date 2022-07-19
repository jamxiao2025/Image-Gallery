const express = require('express')
const router = express.Router()
const refreshTokenController = require('../controllers/refreshTokenController')
//to select all and change to ctrl + d 
router.get('/', refreshTokenController.handleRefreshToken)

module.exports = router