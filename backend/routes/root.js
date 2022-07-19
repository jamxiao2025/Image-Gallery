const express = require('express')
const router = express.Router()
const path = require('path')

//response to a get request to index.html
router.get('^/$|/index(.html)?',(req,res) => {
  //look from root directory -> index.html, root directory = directory we are currently in
  res.sendFile(path.join(__dirname,'..', 'views', 'index.html'))
})



module.exports = router