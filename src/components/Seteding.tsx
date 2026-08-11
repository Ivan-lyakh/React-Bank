import { useState } from "react"
import { useAccount } from "../hooks/useAccount"
import { useTheme } from "../hooks/useTheme"
import { useUser } from "../hooks/useUser"
import styles from '../styles/Seteding.module.css'
import { formatAccountNumber } from "../utils/DashboardHelpers"
import { formatDate } from "../utils/HistoryHelpers"
import { ErrorModal } from "./Error/ErrorModal"
import { SetedingModal } from "./Seteding/SetedingModal"


export const Seteding = () => {

  const { actionsUser, user } = useUser()

  const { account } = useAccount()

  const { toggleTheme, theme } = useTheme()

  const [openModal, setOpenModal] = useState("")

  console.log(openModal)

  return (

    <div className={styles.seteding}>

      {account.error && <ErrorModal message="password is not corected!" />}
      {openModal === "edit" && <SetedingModal mode={openModal} setOpenModal={setOpenModal} />}
      {openModal === "PIN" && <SetedingModal mode={openModal} setOpenModal={setOpenModal} />}

      <div className={styles.setedingCoulumn}>
        <div className={styles.columnHeader}>
          <h2 className="textModal">User:</h2>
        </div>

        <div className={styles.bodyColumn}>
          <div>
            <h2 className="textModal">Name: {user?.user_metadata.name}</h2>
          </div>

          <div>
            <h2 className="textModal">Surename: {user?.user_metadata.surename}</h2>
          </div>

          <div>
            <h2 className="textModal">Email: {user?.email}</h2>
          </div>


          <div>
            <button onClick={() => setOpenModal("edit")} className={styles.columnButton}>Edit details</button>
          </div>

        </div>
      </div>

      <div className={styles.setedingCoulumn}>
        <div className={styles.columnHeader}>
          <h2 className="textModal">Account:</h2>
        </div>


        <div className={styles.bodyColumn}>
          <div>
            <h2 className="textModal">Number account: {formatAccountNumber(String(account.account?.account_number))}</h2>
          </div>

          <div>
            <h2 className="textModal">Create date: {formatDate(String(account.account?.created_at))}</h2>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 className="textModal">PIN:</h2>
            <button onClick={() => setOpenModal("PIN")} className={styles.columnButton}>show PIN</button>
          </div>


        </div>
      </div>

      <div className={styles.setedingCoulumn}>
        <div className={styles.columnHeader}>
          <h2 className="textModal">Systems:</h2>
        </div>

        <div className={styles.bodyColumn}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 className="textModal">Theme:</h2>
            <button disabled={theme === "light"} onClick={() => toggleTheme()} className={styles.columnButton}>light</button>
            <button disabled={theme === "dark"} onClick={() => toggleTheme()} className={styles.columnButton}>dark</button>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <h2 className="textModal">Language: </h2>
            <button className={styles.columnButton}>EN</button>
            <button className={styles.columnButton}>RU</button>
          </div>

          <div>
            <button onClick={() => actionsUser.handleLogout()} className={styles.columnButton}>Log out</button>
          </div>


        </div>

      </div>

    </div >
  )
}