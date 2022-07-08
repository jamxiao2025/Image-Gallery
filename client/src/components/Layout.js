import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <main className = "App">
      <Outlet /> 
    </main>
  )
}
//outlet represents all the children of the layout component/any children nested in it

export default Layout