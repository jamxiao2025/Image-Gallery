//logic to run server .. the installations and changes we made to package.json might affect how this website works when it's uploaded
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {json} = require('body-parser');
const axios = require('axios');
const basicAuth = require('express-basic-auth')

const app = express();  //creates an express application
app.use(cors());
app.use(json());
const { parsed: config } = dotenv.config(); //config() returns variable parsed which we are naming config

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`
const auth = {
  username: config.API_KEY,
  password: config.API_SECRET,
}
//the only way someone can get these is by hacking into our servers

//SERVER-SIDE AUTHENTICATION
/*Now when the auth variable is used as a parameter of an endpoint, the response from this endpoint reaches back to the client if and only if the credentials sent along with the request match.*/
//middleware:
const loginAuth = basicAuth({
  users: {
    admin: '123'
    },
});
app.get('/authenticate', loginAuth, (req, res) => {
  if (req.auth.user === 'admin') {
    res.send('admin');
  }
});
//create an endpoint that react client can call
//get function will handle all the requests that go to local host 7000/photos
//refer to admin documentation page for different types of get requests: https://cloudinary.com/documentation/admin_api#get_resources_by_tag
app.get('/photos', async (req, res)=> { //async arrow function, express will pass in two arguments: req and response that u get
  const response = await axios.get(BASE_URL + '/resources/image', { 
    auth,
    params:{
      max_results: 2
    }
   }) //get request to whatever the BASE_URL is
  return res.send(response.data)  //this is us repsonding to the request
})
//search method, search param is the endpoint
app.get('/search', async (req, res)=>{
    const response = await axios.get(BASE_URL + '/resources/search', {
    auth,
    params :{
        expression: req.query.expression,
        with_field: req.query.with_field
    }
    })
    return res.send(response.data)
})

//tell node server what port to listen to
const PORT = 7000;
app.listen(PORT, console.log(`Server running on port ${PORT}`)) //``back quotes mean template string

//we can get the env variables from .env and use it in our code