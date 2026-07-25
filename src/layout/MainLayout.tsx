import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {



  return (

    <div className="container">
      <div className="wrapper">

        <div className="header">
          <Header />
        </div>

        <div className="main">
          <Outlet />
        </div>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>

  )
}