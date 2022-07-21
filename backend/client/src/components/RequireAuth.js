import {useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import {Route} from 'react-router-dom'
//we are taking in the component that should be rendered if the user is authed, we are also passing the rest
//of the props to the <Route /> component such as exact & the path
const RequireAuth = ({children}) => {
  const { auth } = useAuth()
  console.log(auth.accessToken)
  const location = useLocation()
  return(
    typeof auth.accessToken !== 'undefined' ?( //change condition to null object
      children
    ): (
      <Navigate to="/" replace state={{path: location.pathname}}/>
    )
  )
  //is there user attribute, that means they logged in 
  //Outlet represents child components of RequiredAuth
  //Replace the login in their navigation history with the location that they came from

}

export default RequireAuth