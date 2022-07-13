import { useNavigate } from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthProvider"
import '../css/LogoutStyling.css'
const Logout = () => {
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()

  const logout = async() => {
    setAuth({})
    navigate('/')
  }
  return(
    <button  onClick={logout}>exit</button>
  )
}
export default Logout