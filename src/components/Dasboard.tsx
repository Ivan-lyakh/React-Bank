
import { useAccount } from "../hooks/useAccount"
import { useActions } from "../hooks/useActions"
import { useUser } from "../hooks/useUser"
import styles from '../styles/Dashboard.module.css'
import { DashboardMain } from "./DashboardMain"
import { Loading } from "./Loading/Loading"
import { MassegeModal } from "./Massage/NotificationModal"




export const Dashboard = () => {

  const { user } = useUser()

  const { accountLoading } = useAccount()

  const { actions } = useActions()

  return (
    <div className={styles.main}>

      {actions.form.done && <MassegeModal message="Your transaction was successfully completed!" />}

      <div className={styles.hello}>
        <h2 className="title">Welcome , <span>{user?.user_metadata.name}</span>👋</h2>
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