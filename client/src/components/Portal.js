import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import Logout from './Logout'
import '../css/LogoutStyling.css'
import '../css/PortalStyling.css'
//enter search value -> keyword
const Portal = () => { 
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick = (e) => {
    const btn = e.target.className
    console.log(btn)
    if(btn === 'artcenter'){
      navigate("/artcenter", { replace: true})
    }
    else{
      navigate("/search", {replace:true})
    }
  }
  
  return(
    <>
    <body>
      <header>
        <Logout/>
      </header>
      <main className="grid">
        <button ref={ref} className="donda" onClick={handleClick}>donda</button>
        <button ref={ref}className="artcenter"  onClick={handleClick}>artcenter</button>
      </main>
    </body>
    </>
  )
}
export default Portal