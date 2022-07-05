import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from '/Users/yan/Desktop/react-photo-gallery/client/src/api';
import "/Users/yan/Desktop/react-photo-gallery/client/src/App.css"
import {useAuth} from "/Users/yan/Desktop/react-photo-gallery/client/src/useAuth";

const Query = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
   }
  const [imageList, setImageList] = useState([]); 
  //images.resources is the initial state..? which can be accessed by imageList
  //setImageList is the function that will update imageList
  const [searchValue, setSearchValue] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  //when the app loads, we want to immediately call our API to get our photos
  useEffect(()=>{
     const fetchData = async () => {
       const responseJson = await getImages()
       setImageList(responseJson.resources)
       console.log((responseJson.resources).length) //by using this command <- we can dynamically set our css grid sizes etccuz we will know how many images we want to upload hehe
     }
     fetchData()
  }, []) //dependency array and the different things that can trigger when this is run, which means this only gets runs when the app is loaded.
  //console.log('images', images["resources"][0]) this only displays our image information in the console, but we want to display our actual images
  //we need to create a STATEHOOK to hold our images
  //what this does is create a div, and inside the div, is the elements of imageList (which is an array of resources) mapped to <img> divs so it appears as img
  const handleFormSubmit = async (event) => {
    navigate("/results", { state:
      {query: searchValue}
    })
    //event.preventDefault()//preventing the form from refreshing the page
  }
  
  return(
    <>
    <h1>Logout</h1>
      <button onClick={handleLogout}>Log out</button>
    <form onSubmit={handleFormSubmit}>
      <input value = {searchValue} onChange={(event)=> setSearchValue(event.target.value)} required='required' placeholder="Enter a search value..."></input>
      <button type="submit">Search</button>
    </form>
    <h1>{searchMessage}</h1>
  
    </>
  )
}
export default Query