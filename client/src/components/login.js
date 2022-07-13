import {useRef, useState, useEffect} from 'react'
//we just created a global state of our app, so now we pull in what we need
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import '../css/LoginStyling.css'
const LOGIN_URL = '/auth'
const Login = () => {
  const {setAuth} = useAuth()
  
  const navigate = useNavigate()
  const location = useLocation()
  //then navigate to that page
//if we succesfully login, we will store our auth state in the global context
  const pwdRef = useRef(null)
  const errRef = useRef()

  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  

  useEffect(() => {
    pwdRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  },[pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

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
      setPwd('')
      //navigate here
      navigate("inter", { replace: true}) //replaces success page 
    } catch (err) {
        if(!err?.response){
          setErrMsg('No Server Response')
        } else if (err.response?.status === 400){
          setErrMsg('Missing Password') //using error messages from backend to display on frontend
        } else if (err.response?.status === 401){
          setErrMsg('Unauthorized')
        } else{
          setErrMsg('Login Failed')
        }
        errRef.current.focus() //set focus on error
    }
    
  }
  return(
    
      <section>
        <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password"></label>
          <input 
            type="password" 
            id="password" 
            ref={pwdRef}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            autoFocus
          />
        </form>
      </section>

  )
}

export default Login