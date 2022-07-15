import { useNavigate, useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from '../api';
import "../css/App.css"
import Header from './Header'
import Logout from './Logout'
//enter search value -> keyword
const SearchTest = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [imageList, setImageList] = useState([]); 
  const [searchValue, setSearchValue] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  console.log('We are on the search page')
  /*console.log('form has been submitted')
    try{                                       
    const responseJson = await getImages(searchValue)
    setImageList(responseJson.resources)
    console.log((responseJson.resources).length)
    navigate("/display", {state:
      {photos : imageList}
    })
  }catch (err){
    console.log(err)
*/
async function fetchData(props) {
  const responseJson = await searchImages(props)
  setImageList(responseJson.resources)
  console.log(`We have ${(responseJson.resources).length} images for ${searchValue}`) //by using this command <- we can dynamically set our css grid sizes etccuz we will know how many images we want to upload hehe
  console.log(`${responseJson.resources.length} photos are being sent to display page`)
  navigate("/display", {state:
    {photos: responseJson.resources,
      prevpage: location
    }
  })
}






  const handleFormSubmit = e => {
    e.preventDefault()
    fetchData(searchValue)
    }

  
  return(
    <>
    <Header/>
    <div class="halfborder">some text</div>
    <form onSubmit={handleFormSubmit}>
      <input autoFocus value = {searchValue} onChange={(event)=> setSearchValue(event.target.value)} required='required' placeholder="keyword"></input>
     {/* <button type="submit">Search</button>*/}
    </form>
  
    </>
  )
}
export default SearchTest

