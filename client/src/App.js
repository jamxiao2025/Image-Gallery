import React, { useEffect, useState } from 'react';
import { getImages, searchImages } from './api';
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/authpage"
import Query from "./components/querypage"
import Results from "./components/resultspage"
import { Navigate } from 'react-router-dom';
import {useAuth} from "/Users/yan/Desktop/react-photo-gallery/client/src/useAuth";


const App = () => {
  //I guess what this is doing is instaniating variables imageList and setImageList, which are the first two elements of images.resources?? ACTUALLY...
  //usestate():
  //What does calling useState do? 
        //It declares a “state variable”. Our variable is called count but we could call it anything else, like banana. This is a way to “preserve” some values between the function calls — useState is a new way to use the exact same capabilities that this.state provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.
  //What do we pass to useState as an argument? 
        //The only argument to the useState() Hook is the initial state. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a number for how many times the user clicked, so pass 0 as initial state for our variable. (If we wanted to store two different values in state, we would call useState() twice.)
  //What does useState return? 
        //It returns a pair of values: the current state and a function that updates it. This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class, except you get them in a pair. If you’re not familiar with the syntax we used, we’ll come back to it at the bottom of this page.
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
    event.preventDefault()//preventing the form from refreshing the page
    const responseJson = await searchImages(searchValue)
    console.log(responseJson.resources.length)
    setImageList(responseJson.resources)
    if (responseJson.resources.length === 0){
      setSearchMessage("SORRY...NO RESULTS WERE FOUND!")
    }else{
      setSearchMessage("HERE ARE THE RESULTS!")
    } 
  }
  function RequireAuth({ children }) {
    const { authed } = useAuth();
    return authed === true ? children : <Navigate to="/" replace />;
  }
  return (
    <>
      
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/query" element={<RequireAuth><Query/></RequireAuth>} />
          <Route path="/results" element={<RequireAuth><Results/></RequireAuth>} /> 
          
        </Routes>
       
    </>
  )
}

export default App