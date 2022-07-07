import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from "../context/AuthProvider"
//we just created a global state of our app, so now we pull in what we need

import axios from '../api/axios'
const LOGIN_URL = '/auth'
const Login = () => {
  const {setAuth} = useContext(AuthContext)
  //if we succesfully login, we will store our auth state in the global context
  const pwdRef = useRef()
  const errRef = useRef()

  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false) //replace with router

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
      setSuccess(true)
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
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ): (
      <section>
        <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            ref={pwdRef}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </form>
      </section>
      )
}
    </>
  )
}

export default Login