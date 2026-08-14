import styles from '../styles/Auth.module.css'

import { useState } from 'react'

import ReactLogo from '../images/ReactLogo.png'
import { AuthMode } from './AuthMode'
import { useTranslation } from "react-i18next";
import i18n from "../i18n"
import { FaArrowLeft } from "react-icons/fa";

export const Auth = () => {

  const [mode, setMode] = useState("")

  const { t } = useTranslation();

  const changeLanguage = (language: "en" | "ru") => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };


  return (
    <div>
      <div className={styles.main}>



        <div className='container'>



          <div className={styles.body}>

            <div style={mode !== "" ? { display: "none" } : { display: "flex" }} className={styles.languageBox}>
              <button onClick={() => changeLanguage("en")} className='button'>EN</button>
              <button onClick={() => changeLanguage("ru")} className='button'>RU</button>
            </div>

            <div style={mode === "" ? { display: "none" } : { display: "flex" }}  className={styles.backBox}>
              <button className='button' onClick={() => setMode("")}><FaArrowLeft/></button>
            </div>


            <div className={styles.header}>
              <h2 className="title">{t("auth.hello")} <span>React-Bank!</span></h2>
              <img src={ReactLogo} alt="#logo" />
            </div>


            {mode === ""

              ?

              <div>
                <div className={styles.innerContainer}>
                  <div className={styles.card}>
                    <h2 className='text'>{t("auth.titleRegister")}</h2>

                    <button className='button' onClick={() => setMode("register")} >{t("auth.btnRegister")}</button>

                  </div>

                  <div className={styles.card}>
                    <h2 className='text'>{t("auth.titleLogin")}</h2>

                    <button className='button' onClick={() => setMode("auth")} >{t("auth.btnLogin")}</button>
                  </div>
                </div>
              </div>

              : <AuthMode mode={mode} />

            }


          </div>
        </div>
      </div>
    </div>
  )
}