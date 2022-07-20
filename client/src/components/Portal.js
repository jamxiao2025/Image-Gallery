import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import Logout from './Logout'
import '../css/LogoutStyling.css'
import '../css/PortalStyling.css'
import Header from './Header'
import BorderGrid from '../components/BorderGrid'

//enter search value -> keyword
const Portal = () => { 
  const location = useLocation()
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick = (e) => {
    const btn = e.target.className
    console.log(btn)
    if(btn === 'artcenter'){
      navigate("/artcenter", {state: {prevpage: location} })
    }
    else if (btn ==='PortalExit'){
      navigate("/")
    }else{
      navigate("/search", {state:{prevpage: location}})
    }
  }
  
  return(
    <>
     <Header remove="back"/>
    <body>
    {/*<BorderGrid/>*/}
      <main className="grid">
        <button ref={ref} className="artcenter" onClick={handleClick}>artcenter</button>
        <button ref={ref}className="donda" onClick={handleClick}>donda</button>
      </main>
    </body>
    </>
  )
}
export default Portal