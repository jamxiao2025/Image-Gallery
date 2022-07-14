import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
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
//enter search value -> keyword
const ArtCenter = () => {
  const navigate = useNavigate()
  return(
    <>
    <body className="art">
      <div class="halfborder"></div>
        <main class="ArtCenterMain">
          <img className="artCenterImage" src={image1}/>
          <img className="artCenterImage" src={image2}/>
          <img className="artCenterImage" src={image3}/>
          <img className="artCenterImage" src={image4}/>
          <img className="artCenterImage" src={image5}/>
          <img className="artCenterImage" src={image6}/>
          <img className="artCenterImage" src={image7}/>
          <img className="artCenterImage" src={image8}/>
          <img className="artCenterImage" src={image9}/>
          <img className="artCenterImage" src={image10}/>
          <img className="artCenterImage" src={image11}/>
          <img className="artCenterImage" src={image12}/>
        </main>
    </body>
    </>
  )
}
export default ArtCenter