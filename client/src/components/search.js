import { useNavigate , useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from '../api';
import "../css/App.css"
import Header from './Header'
import Logout from './Logout'
//enter search value -> keyword
const Search = () => {
  const location= useLocation()
  const navigate = useNavigate()

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
    try{
      navigate("/display", { state:
        {query: searchValue,
          prevpage: location
        }
      })
    } catch (err) {
      console.log(err)
    }
    //event.preventDefault()//preventing the form from refreshing the page
  }
  
  return(
    <>
    <Header/>
    <div class="halfborder1"></div>
    <div class="halfborder2"></div>
    <div class="halfborder3"></div>


    <form onSubmit={handleFormSubmit}>
      <input autoFocus={true} value = {searchValue} onChange={(event)=> setSearchValue(event.target.value)} required='required' placeholder="keyword"></input>
     {/* <button type="submit">Search</button>*/}
    </form>
    <h1>{searchMessage}</h1>
  
    </>
  )
}
export default Search