import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {



  return (

    <div className="wrapper">

      <div className="header">
        <div className="container">
          <Header />
        </div>
      </div>

      <div className="main">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <Footer />
        </div>
      </div>
    </div>

  )
}