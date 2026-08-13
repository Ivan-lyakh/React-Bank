import logo from '../images/ReactLogo.png'
import styles from '../styles/Header.module.css'
import logoSeteding from '../images/seteding.png'
import logoSetedingWhite from '../images/setedingWhite2.png'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from 'react-i18next'

export const Header = () => {

  const { theme } = useTheme()

  const navigate = useNavigate()

  const { t } = useTranslation()


  return (
    <div className={styles.main}>

      <div className={styles.mainContainer}>
        <div className={styles.sectionHeader}>
          <img src={logo} alt="#" />
          <h2 className='title'>React-Bank!</h2>
        </div>

        <div className={styles.seactionTools}>
          <button onClick={() => navigate("/")} className='button'>{t("header.home")}</button>
          <button onClick={() => navigate("/history")} className='button'>{t("header.history")}</button>
        </div>
      </div>

      <div>
        <div className={styles.sectionSeteding}>
          <button onClick={() => navigate("/setteding")}>{theme === "light" ? <img style={{ width: "100px" }} src={logoSeteding} alt="#" /> : <img src={logoSetedingWhite} alt="#" />}</button>
        </div>
      </div>



    </div>
  )
}  