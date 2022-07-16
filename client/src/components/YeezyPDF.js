import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Header from './Header'
//import Logout from './Logout'
//import '../css/LogoutStyling.css'
import image1 from './images/0001.jpg'
import image2 from './images/0002.jpg'
import image3 from './images/0003.jpg'
import image4 from './images/0004.jpg'
import image5 from './images/0005.jpg'
import image6 from './images/0006.jpg'
import image7 from './images/0007.jpg'
import image8 from './images/0008.jpg'
import image9 from './images/0009.jpg'
import image10 from './images/0010.jpg'
import image11 from './images/0011.jpg'
import image12 from './images/0012.jpg'
import '../css/ArtCenterStyling.css'
//enter search value -> keyword
const YeezyPDF = () => {
  const navigate = useNavigate()
  return(
    <>
    <Header/>
    <body className="ArtCenterBody">
    {/*}  <div class="halfborder"></div>*/}
    <div class="halfborder1">some text</div>
    <div class="halfborder2">some text</div>
    <div class="halfborder3">some text</div>

        <main class="ArtCenterMain">
          <img className="ArtCenterImage" src={image1}/>
          <img className="ArtCenterImage" src={image2}/>
          <img className="ArtCenterImage" src={image3}/>
          <img className="ArtCenterImage" src={image4}/>
          <img className="ArtCenterImage" src={image5}/>
          <img className="ArtCenterImage" src={image6}/>
          <img className="ArtCenterImage" src={image7}/>
          <img className="ArtCenterImage" src={image8}/>
          <img className="ArtCenterImage" src={image9}/>
          <img className="ArtCenterImage" src={image10}/>
          <img className="ArtCenterImage" src={image11}/>
          <img className="ArtCenterImage" src={image12}/>
        </main>
    </body>
    </>
  )
}
export default YeezyPDF