import styles from '../styles/Dashboard.module.css'

import { useHistory } from '../hooks/useHistory'
import { useTranslation } from 'react-i18next'

import { LoadingForLastHistory } from './Loading/LoadingForLastHistory'
import { LastHistoryList } from './LastHistoryList'



export const LastHistory = () => {

  const { t } = useTranslation()

  const { history } = useHistory()

  return (
    <div className={styles.lastHistory}>

      <div className={styles.lastHistoryHeader}>
        <h2>{t("lastHistory.title")}</h2>
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