
import styles from "../styles/History.module.css"
import { HistoryFromList } from "./HistoryFromList"

import type { History } from "../types/HistoryTypes"
import { useHistory } from "../hooks/useHistory"
import { useTranslation } from "react-i18next"



export const AllHistory = () => {

  const { history } = useHistory()

  console.log(history.history.length)

  const { t } = useTranslation()

  return (
    <div className={styles.main}>

      <div className={styles.header}>

        <div className={styles.table}>

          <div className={styles.section}>
            <h2>{t("allHistory.date")}: </h2>
          </div>

          <div className={styles.section}>
            <h2>{t("allHistory.type")}:</h2>
          </div>

          <div className={styles.section}>
            <h2>{t("allHistory.sum")}:</h2>
          </div>

          <div className={styles.section}>
            {t("allHistory.sender")}:
          </div>

          <div className={styles.section}>
            {t("allHistory.recipient")}:
          </div>

        </div>

      </div>

      <div className={styles.list}>

        {history.history.length === 0
          ?
          <h2>{t("allHistory.listClear")}</h2>
          : history.history.map((item: History) => {
            return (
              <HistoryFromList
                key={item.id}
                data={item} />
            )
          })
        }

      </div>

    </div>
  )
}