
import { useAccount } from "../hooks/useAccount"
import { useUser } from "../hooks/useUser"
import styles from '../styles/Dashboard.module.css'
import { DashboardMain } from "./DashboardMain"
import { Loading } from "./Loading/Loading"




export const Dashboard = () => {

  const { user } = useUser()

  const {accountLoading } = useAccount()

  return (
    <div className={styles.main}>

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