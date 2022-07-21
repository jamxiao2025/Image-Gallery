const express = require('express')
require('dotenv').config() 
const app = express()
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const {json} = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 3500
const BASE_URL = `https://api.cloudinary.com/v1_1/jamxiao`

const auth = {
  //username: config.API_KEY,
  username: "444146749244156",
  //password: config.API_SECRET,
  password: "CvTrmsC1PtHuqZrM9wV7y2hmQTE"
}
//connect to DB
connectDB()
//this works as a waterfall
//custom logger middleware - we need to call next/built in middelware already does this
app.use(logger)
//built-in middleware to handle urlencoded data
//in other words...form data
app.use(credentials)
app.use(cors(corsOptions))

// 'content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

//built-in middleware for json 
app.use(json())
//app.use(json());

//built-in middleware for cookies
app.use(cookieParser())
//serve static files
//app.use(express.static(path.join(__dirname, '/public')))

//provide a route, this will route any request coming to the subdir to the router file and gets handled there
app.use('/', require('./routes/root'))// "/..."
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh')) //issues a new access token
app.use('/logout', require('./routes/logout'))
app.get('/photos', async (req, res)=> { //async arrow function, express will pass in two arguments: req and response that u get
  const response = await axios.get(BASE_URL + '/resources/image', { 
    auth,
    params:{
      max_results: 10 /*this is where the number of load more images is controlled */
    }
   }) //get request to whatever the BASE_URL is
  return res.send(response.data)  //this is us repsonding to the request
})
//search method, search param is the endpoint
app.get('/search', async (req, res)=>{
  const params = new URLSearchParams()
  console.log(`Next cursor: ${req.query.next_cursor}`)
  /*
  params.append(`expression`, expr)
  params.append(`with_field`, "tags")
  params.append('max_results', 1)
  if (nextCursor) {
		params.append('next_cursor', nextCursor);
	}*/
  params.append('expression', req.query.expression)
  params.append('with_field', req.query.with_field)
  params.append('prefix', req.query.prefix)
  params.append('max_results', req.query.max_results)
  if(req.query.next_cursor){
    params.append('next_cursor', req.query.next_cursor)
  }
    const response = await axios.get(BASE_URL + '/resources/search', {
    auth,
    params
    })
    console.log("we been activated")
    return res.send(response.data)
})
//we want to protect routes from here, so anything after this line will use the verifyJWT middleware
app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))//user doesn't need to type "api", just "employees"

//ANYTHING THAT MADE IT HERE IS A 404 
app.all('*', (req,res) => {
   // res.sendFile(path.join(__dirname,'views', '404.html')) //this doesn't send a 404 code
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) //chaining with status command to send a 404 code
})


app.use(errorHandler)
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
//we don't want to listen for requests if connection Mongo fails
//open event is emitted only once the connection is connected
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
})


