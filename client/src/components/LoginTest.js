import {useRef, useState, useEffect} from 'react'
//we just created a global state of our app, so now we pull in what we need
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import '../css/LoginTestStyling.css'
import BorderGrid from '../components/BorderGrid'
const LOGIN_URL = '/auth'
const LoginTest = () => {
  const {setAuth} = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const span = useRef();

  const [pwd, setContent] = useState('');
  const [width, setWidth] = useState(0);
  

  //then navigate to that page
//if we succesfully login, we will store our auth state in the global context
  

  useEffect(() => {
    setWidth(span.current.offsetWidth*3);

  }, [pwd]);

  const changeHandler = evt => {
    setContent(evt.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(pwd)
    try{
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({pwd}), 
          {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
          }
      )  
      console.log(JSON.stringify(response?.data))
      //storing accessToken
      const accessToken = response?.data.accessToken
      const roles = response?.data?.roles
      setAuth({pwd, roles, accessToken}) //storing this information inside of Auth object
      setContent('')
      //navigate here
      navigate("portal", { replace: true}) //replaces success page 
    } catch (err) {
        console.log(err)
    }
  }
  return (
<body class="LoginBody">
    <BorderGrid/>
      <main className="LoginForm">
      <form class="LoginForm" onSubmit={handleSubmit} >
      <span id="hide" ref={span}>{pwd}</span>
      <input 
      type="password" 
      style={{width: width*1.5, height:width * 2}} /*height: width * 2 -1 for empty space at start */
      autoFocus 
      onChange={changeHandler} 
      />
      </form>
      </main>
    </body>
  )
}

export default LoginTest