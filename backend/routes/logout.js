const express = require('express')
const router = express.Router()
const logoutController = require('../controllers/logoutController')
//to select all and change to ctrl + d 
router.get('/', logoutController.handleLogout)

module.exports = router