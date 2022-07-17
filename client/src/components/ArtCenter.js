import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import Header from './Header'
import '../css/PDFListStyling.css'
//enter search value -> keyword
const ArtCenter = () => { 
  const location = useLocation()
  const navigate = useNavigate()
  const ref = useRef(null);
  const handleClick = (e) => {
    const path = e.target.id
    console.log(`Travelling to: ${path}`)
    navigate(`/${path}`)
  }

  return(
    <>
    <body>
     <Header/>
      <main className="PDFGrid">
        <button ref={ref} id="yeezy" className="artcenter" onClick={handleClick}>yeezy</button>
      </main>
    </body>
    </>
  )
}
export default ArtCenter