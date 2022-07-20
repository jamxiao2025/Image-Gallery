import { useNavigate , useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from '../api';
import "../css/App.css"
import Header from './Header'
import Logout from './Logout'
import BorderGrid from '../components/BorderGrid'

//enter search value -> keyword
const Search = () => {
  const location= useLocation()
  const navigate = useNavigate()

  const [imageList, setImageList] = useState([]); 
  //images.resources is the initial state..? which can be accessed by imageList
  //setImageList is the function that will update imageList
  const [searchValue, setSearchValue] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  
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


    <form onSubmit={handleFormSubmit}>
      <input autoFocus={true} value = {searchValue} onChange={(event)=> setSearchValue(event.target.value)} required='required' placeholder="keyword"></input>
     {/* <button type="submit">Search</button>*/}
    </form>
    <h1>{searchMessage}</h1>
  
    </>
  )
}
export default Search