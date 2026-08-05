
import { useHistory } from '../hooks/useHistory'
import styles from '../styles/Dashboard.module.css'
import { LoadingForLastHistory } from './Loading/LoadingForLastHistory'
import { LastHistoryList } from './LastHistoryList'

export const LastHistory = () => {

  const { history } = useHistory()

  return (
    <div className={styles.lastHistory}>

      <div className={styles.lastHistoryHeader}>
        <h2>You 5 last history!</h2>
      </div>

      <div className={styles.lastHistoryBody}>

        {history.loading
          ? <LoadingForLastHistory />
          : <LastHistoryList/>
        }


      </div>

    </div>
  )
}