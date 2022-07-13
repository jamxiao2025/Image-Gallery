import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useCallback} from 'react';
import { getImages, searchImages } from '../api';
//import "../css/App.css"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Logout from './Logout'
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import "../css/ImageStyling.css"

const DisplayTest = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);


  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  }
  const location = useLocation()
  const query = location.state.query
  console.log(query)
  const photos = []

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
      console.log(imageList.length)
      if (responseJson.resources.length === 0){ 
        setSearchMessage("SORRY...NO RESULTS WERE FOUND!")
      }else{
        setSearchMessage("HERE ARE THE RESULTS!")
      }
    }
     
    inputSearch()
   
 },[]) //depen
 
 const openLightbox = useCallback((event, { image, index }) => {
  setCurrentImage(index);
  setViewerIsOpen(true);
}, []);

for (var i=0; i<imageList.length; i++){
  photos[i] = {
    src: imageList[i].url,
    width:3,
    height:4
  }
}
console.log(photos)
  //when the app loads, we want to immediately call our API to get our photos
 //dependency array and the different things that can trigger when this is run, which means this only gets runs when the app is loaded.
  //console.log('images', images["resources"][0]) this only displays our image information in the console, but we want to display our actual images
  //we need to create a STATEHOOK to hold our images
  //what this does is create a div, and inside the div, is the elements of imageList (which is an array of resources) mapped to <img> divs so it appears as img
console.log(Gallery)
  return(
    <>
     <Gallery className = "image-grid" photos={photos} onClick={openLightbox} direction={"column"}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.src,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}

      </ModalGateway>

    </>
  )
}
export default DisplayTest

