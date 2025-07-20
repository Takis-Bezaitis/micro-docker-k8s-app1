import { Outlet } from "react-router"
import NavBar from "./NavBar"

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout