import { useNavigate, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef, useContext} from 'react';
import Logout from './Logout'
import '../css/HeaderStyling.css'
import AuthContext from "../context/AuthProvider"

const Header = (props) => {
  const remove = props.remove
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick =  (e) => {
      setAuth({})
      console.log('header logout secured')
      ref.current.style = {animation: "scale 1.5s both"}
      navigate("/",  { replace: true})
    }
  
  return(
    /*display none*/
    <>
    {remove === "back" ? (
      <header id="HeaderClass">
      <button ref={ref} id="start" className="HeaderButton" onClick={handleClick} >exit</button>
      <button ref={ref} id="end" className="HeaderButtonHide" onClick={()=>navigate(-1)}>back</button>
    </header>
    ): remove==="exit" ? (
      <header id="HeaderClass">
        <button ref={ref} id="start" className="HeaderButtonHide" onClick={handleClick} >exit</button>
        <button ref={ref} id="end" className="HeaderButton" onClick={()=>navigate(-1)}>back</button>
      </header>
    ):(
      <header id="HeaderClass">
        <button ref={ref} id="start" className="HeaderButton" onClick={handleClick} disabled="disabled" >exit</button>
        <button ref={ref} id="end" className="HeaderButton" onClick={()=>navigate(-1)}>back</button>
      </header>
    )
    }
    </>
  )
}
export default Header