import styles from '../styles/ActionsModal.module.css'
import closedIcon from '../images/closed.png'
import { Transfer } from './ActionsStatus/Transfer'
import { Deposit } from './ActionsStatus/Deposit'
import { Windtraw } from './ActionsStatus/Windtraw'
import { Loan } from './ActionsStatus/Load'
import { useState } from 'react'
import { ActionsPIN } from './ActionsControlPin'
import { title } from '../utils/ActionModalHellpers'

type Props = {
  status: string
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const ActionsModal = (props: Props) => {

  const [security, setSecurity] = useState(true)

  return (
    <div className={styles.modal}>

      <div className="container">

        <div className={styles.modalBox}>

          <div className={styles.title}>
            {title(props.status)}
          </div>

          <div className={styles.closed}>
            <img onClick={() => props.goActive("")} src={closedIcon} alt="#" />
          </div>

          <div>

            {security

              ? <ActionsPIN lock={setSecurity} />

              : <div className={styles.body}>

                {props.status === "transfer" && <Transfer />}

                {props.status === "deposit" && <Deposit />}

                {props.status === "windtraw" && <Windtraw />}

                {props.status === "loan" && <Loan />}

              </div>

            }

          </div>


        </div>
      </div>

    </div>
  )
}