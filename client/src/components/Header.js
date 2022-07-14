import { useNavigate, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext} from 'react';
import Logout from './Logout'
import '../css/HeaderStyling.css'
import AuthContext from "../context/AuthProvider"

const Header = () => {
  const {state} = useLocation()
  const {prevpage} = state
  console.log(prevpage)
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick = (e) => {
      setAuth({})
      navigate("/",  { replace: true})
    }
  
  return(
    <>
      <header id="HeaderClass">
        <button ref={ref} id="start" className="HeaderButton" onClick={handleClick}>exit</button>
        <button ref={ref} id="end" className="HeaderButton" onClick={()=>navigate(prevpage)}>back</button>
      </header>
    </>
  )
}
export default Header