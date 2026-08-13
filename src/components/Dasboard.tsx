
import { useEffect, useState } from "react"
import { useAccount } from "../hooks/useAccount"
import { useActions } from "../hooks/useActions"
import { useHistory } from "../hooks/useHistory"
import { useUser } from "../hooks/useUser"
import styles from '../styles/Dashboard.module.css'
import { DashboardMain } from "./DashboardMain"
import { Loading } from "./Loading/Loading"
import { MassegeModal } from "./Massage/NotificationModal"
import type { History } from "../types/HistoryTypes"
import { MessageForMount } from "./Massage/MessageForMount"
import { useTranslation } from "react-i18next"




export const Dashboard = () => {

  const { user } = useUser()

  const { accountLoading, account } = useAccount()

  const { history, loadHistory } = useHistory()

  const [newTransfer, setNewTransfer] = useState<null | History>(null)

  const { actions } = useActions()


  useEffect(() => {
    if (!account.account) return;
    loadHistory(account.account.account_number);
  }, [account.account]);

  useEffect(() => {

    const currentAccount = account.account;

    if (!currentAccount) return;



    const result = history.history.find(
      item =>
        item.recipient_number === currentAccount.account_number &&
        !item.recipient_read
    );


    setNewTransfer(result ?? null);


  }, [history.history, account.account]);

  console.log(localStorage)

  const { t } = useTranslation()

  return (
    <div className={styles.main}>

      {newTransfer && <MessageForMount newTransfer={newTransfer} message={newTransfer.message} setNewTransfer={setNewTransfer} />}

      {actions.form.done && <MassegeModal message={t("dashboard.massegeDoneTransActions")} />}

      <div className={styles.hello}>
        <h2 className="title">{t("dashboard.hello")} , <span>{user?.user_metadata.name}</span>👋</h2>
      </div>

      <div className={styles.body}>

        {accountLoading === false
          ? <DashboardMain />
          : <Loading />
        }

      </div>

    </div>
  )
}