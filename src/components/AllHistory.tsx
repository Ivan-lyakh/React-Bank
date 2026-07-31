import { useHistory } from "../hooks/useHistory"
import styles from "../styles/History.module.css"
import { HistoryFromList } from "./HistoryFromList"
import type { History } from "../types/HistoryTypes"


export const AllHistory = () => {


  const { history } = useHistory()

  return (
    <div className={styles.main}>

      <div className={styles.header}>

        <div className={styles.table}>

          <div className={styles.section}>
            <h2>Date: </h2>
          </div>

          <div className={styles.section}>
            <h2>Type:</h2>
          </div>

          <div className={styles.section}>
            <h2>Sum:</h2>
          </div>

          <div className={styles.section}>
            Sender:
          </div>

          <div className={styles.section}>
            Recipient:
          </div>

        </div>

      </div>

      <div className={styles.list}>

        {history.history.length === 0
          ?
          <h2>None history</h2>
          : history.history.map((item: History) => {
            return <HistoryFromList key={item.id} data={item} />
          })
        }

      </div>

    </div>
  )
}