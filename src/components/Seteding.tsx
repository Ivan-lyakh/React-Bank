import styles from '../styles/Seteding.module.css'

import { useState } from "react"
import { useAccount } from "../hooks/useAccount"
import { useTheme } from "../hooks/useTheme"
import { useUser } from "../hooks/useUser"
import { useTranslation } from "react-i18next";

import { formatAccountNumber } from "../utils/DashboardHelpers"
import { formatDate } from "../utils/HistoryHelpers"
import { ErrorModal } from "./Error/ErrorModal"
import { SetedingModal } from "./Seteding/SetedingModal"
import i18n from "../i18n"


export const Seteding = () => {

  const { actionsUser, user } = useUser()

  const { account } = useAccount()

  const { toggleTheme, theme } = useTheme()

  const [openModal, setOpenModal] = useState("")

  const { t } = useTranslation();

  const [language, setLanguage] = useState(localStorage.getItem("language"))


  const changeLanguage = (language: "en" | "ru") => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };



  return (

    <div className={styles.seteding}>

      {account.error && <ErrorModal message={t("setedingModal.errorPin")} />}
      {openModal === "edit" && <SetedingModal mode={openModal} setOpenModal={setOpenModal} />}
      {openModal === "PIN" && <SetedingModal mode={openModal} setOpenModal={setOpenModal} />}

      <div className={styles.setedingCoulumn}>
        <div className={styles.columnHeader}>
          <h2 className="textModal">{t("seteding.user")}:</h2>
        </div>

        <div className={styles.bodyColumn}>
          <div>
            <h2 className="textModal">{t("seteding.name")}: {user?.user_metadata.name}</h2>
          </div>

          <div>
            <h2 className="textModal">{t("seteding.surname")}: {user?.user_metadata.surename}</h2>
          </div>

          <div>
            <h2 className="textModal">{t("seteding.email")}: {user?.email}</h2>
          </div>


          <div>
            <button onClick={() => setOpenModal("edit")} className={styles.columnButton}>{t("seteding.btnUser")}</button>
          </div>

        </div>
      </div>

      <div className={styles.setedingCoulumn}>
        <div className={styles.columnHeader}>
          <h2 className="textModal">{t("seteding.account")}:</h2>
        </div>


        <div className={styles.bodyColumn}>
          <div>
            <h2 className="textModal">{t("seteding.accountNumber")}: {formatAccountNumber(String(account.account?.account_number))}</h2>
          </div>

          <div>
            <h2 className="textModal">{t("seteding.createDate")}: {formatDate(String(account.account?.created_at))}</h2>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 className="textModal">PIN:</h2>
            <button onClick={() => setOpenModal("PIN")} className={styles.columnButton}>{t("seteding.btnAccount")}</button>
          </div>


        </div>
      </div>

      <div className={styles.setedingCoulumn}>
        <div className={styles.columnHeader}>
          <h2 className="textModal">{t("seteding.systems")}:</h2>
        </div>

        <div className={styles.bodyColumn}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 className="textModal">{t("seteding.btnTheme")}:</h2>
            <button disabled={theme === "light"} onClick={() => toggleTheme()} className={styles.columnButton}>{t("seteding.light")}</button>
            <button disabled={theme === "dark"} onClick={() => toggleTheme()} className={styles.columnButton}>{t("seteding.dark")}</button>
          </div>



          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 className="textModal">{t("seteding.btnLeng")}: </h2>
            <button disabled={language === "en"} onClick={() => {
              setLanguage("en")
              changeLanguage("en")
            }} className={styles.columnButton}>EN</button>
            <button disabled={language === "ru"} onClick={() => {
              setLanguage("ru")
              changeLanguage("ru")
            }} className={styles.columnButton}>RU</button>
          </div>

          <div>
            <button onClick={() => actionsUser.handleLogout()} className={styles.columnButton}>{t("seteding.btnLogout")}</button>
          </div>


        </div>

      </div>

    </div >
  )
}