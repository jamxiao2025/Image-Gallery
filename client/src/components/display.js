import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from '../api';
import "../css/App.css"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Logout from './Logout'
import '../css/DisplayStyling.css'
import Header from './Header'
import BorderGrid from './BorderGrid'
const Display = () => {
  const location = useLocation()
  const query = location.state.query
  console.log(query)
  
  const [imageList, setImageList] = useState([]); 
  //images.resources is the initial state..? which can be accessed by imageList
  //setImageList is the function that will update imageList
  const [searchValue, setSearchValue] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  const [nextCursor, setNextCursor] = useState(null);

  useEffect(()=>{
    const inputSearch = async() =>{
      const responseJson = await searchImages(query, nextCursor)
      console.log(responseJson.resources.length)
      setImageList(responseJson.resources)
      setNextCursor(responseJson.next_cursor);
      if (responseJson.resources.length === 0){
        setSearchMessage("SORRY...NO RESULTS WERE FOUND!")
      }else{
        setSearchMessage("HERE ARE THE RESULTS!")
      }
    }
    inputSearch()
 }, []) //depen
  
const handleLoadMoreButtonClick = async () => {

  const responseJson = await getImages(nextCursor);
  setImageList((currentImageList) => [
    ...currentImageList,
    ...responseJson.resources,
  ]);
  setNextCursor(responseJson.next_cursor);
};

  //when the app loads, we want to immediately call our API to get our photos
 //dependency array and the different things that can trigger when this is run, which means this only gets runs when the app is loaded.
  //console.log('images', images["resources"][0]) this only displays our image information in the console, but we want to display our actual images
  //we need to create a STATEHOOK to hold our images
  //what this does is create a div, and inside the div, is the elements of imageList (which is an array of resources) mapped to <img> divs so it appears as img

  return(
    <>
    {searchMessage === ("SORRY...NO RESULTS WERE FOUND!") ? (
      <body className="DisplayBodyNah">
        <h1 className="nahMsg">nah</h1>
        <Header/>
      </body>
    ):(
     <> 
  <BorderGrid/>
     <div className="container">
      <div className="LoadButtonCenter">
        <button id="sw"class="loadHide"onClick>+</button>
        {nextCursor && (
        <button id="se"onClick={handleLoadMoreButtonClick}>+</button>
				)}
        <button class="loadHide"id="si"onClick>+</button>
        </div>
      </div>
      <body className="DisplayBody">
      <Header/>
      <main className="DisplayMain">
      <div className="DisplayImageGrid">
        {imageList.map((image)=> <Zoom><div className="pic"><img class="DisplayImage"src={image.url} alt={image.public_id}></img></div></Zoom>)},
      </div>
      </main>
      </body>
      </>
    )}
    
    </>
  )
}
export default Display