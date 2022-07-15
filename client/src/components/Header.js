import { useNavigate, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext} from 'react';
import Logout from './Logout'
import '../css/HeaderStyling.css'
import AuthContext from "../context/AuthProvider"

const Header = () => {
  
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick = (e) => {
      setAuth({})
      console.log('header logout secured')
      navigate("/",  { replace: true})
    }
  
  return(
    <>
      <header id="HeaderClass">
        <button ref={ref} id="start" className="HeaderButton" onClick={handleClick}>exit</button>
        <button ref={ref} id="end" className="HeaderButton" onClick={()=>navigate(-1)}>back</button>
      </header>
    </>
  )
}
export default Header