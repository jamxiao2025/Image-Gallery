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
    const btn = e.target.id
    console.log(btn)
    navigate(`/${btn}`)
  }
  
  return(
    <>
    <body>
     <Header/>
    <div class="halfborder">some text</div>
      <main className="PDFGrid">
        <button ref={ref} id="yeezy" className="artcenter" onClick={handleClick}>yeezy</button>
      </main>
    </body>
    </>
  )
}
export default ArtCenter