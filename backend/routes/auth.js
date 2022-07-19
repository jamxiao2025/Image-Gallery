const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
//to select all and change to ctrl + d 
router.post('/', authController.handleLogin)

module.exports = router