
import styles from '../styles/Dashboard.module.css'
import { CardDashboard } from "./CardDashboard"
import { ActionDashboard } from './ActionDashboard'
import { useState } from 'react'
import { ActionsModal } from './ActionsModal'


export const DashboardMain = () => {

  const [actionActive, setActionActive] = useState("")


  return (
    <div className={styles.dashboard}>

      {actionActive !== "" && <ActionsModal status={actionActive} goActive={setActionActive} />}


      <div className={styles.column}>

        <CardDashboard />

        <ActionDashboard
          goActive={setActionActive}

        />

      </div>

      <div>

      </div>

    </div>
  )

}