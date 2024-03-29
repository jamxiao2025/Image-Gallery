import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from '../api';
import "../css/App.css"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Logout from './Logout'
import '../css/DisplayStyling.css'
import Header from './Header'
const Display = () => {
  const location = useLocation()
  const query = location.state.query
  console.log(query)
  
  const [imageList, setImageList] = useState([]); 
  //images.resources is the initial state..? which can be accessed by imageList
  //setImageList is the function that will update imageList
  const [searchValue, setSearchValue] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  useEffect(()=>{
    const inputSearch = async() =>{
      const responseJson = await searchImages(query)
      console.log(responseJson.resources.length)
      setImageList(responseJson.resources)
      if (responseJson.resources.length === 0){
        setSearchMessage("SORRY...NO RESULTS WERE FOUND!")
      }else{
        setSearchMessage("HERE ARE THE RESULTS!")
      }
    }
    inputSearch()
 }, []) //depen

 function ImageGridItem(image) {
  console.log(image.height)
  const style = {
    gridColumnEnd: `span ${getSpanEstimate(image.width)}`,
    gridRowEnd: `span ${getSpanEstimate(image.height)}`,
  }

  return <img style={style} src={image.url} alt={image.alt} />
}

function getSpanEstimate(size) {
  if (size > 2000) {
    return 3
  }

  return 1
}

  //when the app loads, we want to immediately call our API to get our photos
 //dependency array and the different things that can trigger when this is run, which means this only gets runs when the app is loaded.
  //console.log('images', images["resources"][0]) this only displays our image information in the console, but we want to display our actual images
  //we need to create a STATEHOOK to hold our images
  //what this does is create a div, and inside the div, is the elements of imageList (which is an array of resources) mapped to <img> divs so it appears as img

  return(
    <>
     <body className="DisplayBody">
    <Header/>
    <main className="DisplayMain">
    <div className="DisplayImageGrid">
      {imageList.map((image)=> <>{ImageGridItem(image)}</>)},
    </div>
    </main>
    </body>
    </>
  )
}
export default Display