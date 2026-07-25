import logo from '../images/ReactLogo.png'
import styles from '../styles/Header.module.css'
import logoSeteding from '../images/seteding.png'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

  const navigate = useNavigate()


  return (
    <div className={styles.main}>

      <div className={styles.mainContainer}>
        <div className={styles.sectionHeader}>
          <img src={logo} alt="#" />
          <h2 className='title'>React-Bank!</h2>
        </div>

        <div className={styles.seactionTools}>
          <button onClick={() => navigate("/")} className='button'>Home</button>
          <button className='button'>History</button>
        </div>
      </div>

      <div>
        <div className={styles.sectionSeteding}>
          <button onClick={() => navigate("/setteding")}><img src={logoSeteding} alt="#" /></button>
        </div>
      </div>



    </div>
  )
}  