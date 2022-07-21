import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import Header from './Header'
import '../css/PDFListStyling.css'
//enter search value -> keyword
const ArtCenter = () => { 
  const backgroundRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick = (e) => {
    const path = e.target.id
    console.log(`Travelling to: ${path}`)
    navigate(`/${path}`)
  }
  const setHover = (e) => {
    backgroundRef.current.id="transition"
    console.log(backgroundRef.current.id)
  //  backgroundRef.current.style = "animation: transitionColor 2s 1 normal forwards;";
  }
  const removeHover = (e) => {
    backgroundRef.current.id=""
  }
  return(
    <>
    <body ref={backgroundRef}className="slatt">
     <Header/>
      <main  className="PDFGrid">
        <button ref={ref} id="yeezy" className="artcenter" onClick={handleClick} onMouseEnter={()=> setHover()} onMouseLeave={()=> removeHover()} >yeezy</button>
      </main> 
    </body>
    </>
  )
}
export default ArtCenter