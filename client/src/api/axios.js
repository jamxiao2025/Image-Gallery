import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:3500'
})

//setting baseURL so we don't have to do that anywhere else..we will always export from this file if other files need it