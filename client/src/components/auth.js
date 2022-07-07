import React from 'react'
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import {useRef, useState, useEffect} from 'react'
/*
Our (simple) Login component renders a header and a button. When the user clicks on the button, we call login (which we got from our useAuth Hook), then once they're logged in, using navigate, we send them to their /query.
*/

const Auth = () => {
  
   const passRef = useRef()
   const errRef = useRef()

   const [pwd, setPwd] = useState('')
   const [errMsg, setErrMsg] = useState('')
   const [success, setSuccess] = useState(false)
   
   //This effect is called when the page loads. This sets the focus on the first input (password)
   useEffect(()=> {
     passRef.current.focus()
   },[])

   //empty out error message if the user changes password state (change inputs)
   useEffect(()=>{
      setErrMsg('')
   },[pwd])

   //prevent page from reloading on submit
   const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(pwd)
    setPwd('')
    setSuccess(true)
   }
   const navigate = useNavigate()

   const { login } = useAuth()
   const { authed } = useAuth()
   console.log(login)

   return(
     <>
        {success ? (
            <section>
              <h1>You are logged in!</h1>
              <br />
              <p>
                <a href="#">Go Home</a>
              </p>
            </section>
        ): (
          <section>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen" } aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="password">Password:</label>
              <input 
                type="password"
                id="password"
                ref={passRef}
                onChange = {(e) => setPwd(e.target.value)}
                value = {pwd}
                required
              />
            <button> Sign In</button>
          </form>
         </section>
        )}
     </>
   )
}
export default Auth