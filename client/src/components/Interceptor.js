import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Logout from './Logout'
import '../css/LogoutStyling.css'
import '../css/InterceptorStyling.css'
//enter search value -> keyword
const Interceptor = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (event) => {
    try{
      navigate("/display")
    } catch (err) {
      console.log(err)
    }
    //event.preventDefault()//preventing the form from refreshing the page
  }
  
  return(
    <>
    <div className="container">
    <Logout/>
    
    <div className="grid-container-element">
      <div className="item1">
        <button id="search">Donda</button>
      </div>
      <div className="item2">
        <button id="portfolio">Art Center</button>
        </div>
    </div>
    </div>
    </>
  )
}
export default Interceptor