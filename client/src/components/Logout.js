import { useNavigate } from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthProvider"

const Logout = () => {
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
  const logout = async() => {
    setAuth({})
    navigate('/')
  }
  return(
    <button onClick={logout}>Sign Out</button>
  )
}
export default Logout