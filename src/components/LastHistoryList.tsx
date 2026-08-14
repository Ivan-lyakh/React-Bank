import styles from '../styles/Dashboard.module.css'


import { useState, useEffect } from "react";
import { useHistory } from "../hooks/useHistory";
import { useAccount } from "../hooks/useAccount";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { History } from "../types/HistoryTypes";
import { formatNumber } from "../utils/DashboardHelpers";
import { FaPaperPlane } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";



export const LastHistoryList = () => {

  const { history } = useHistory()

  const { account } = useAccount()

  const [list, setList] = useState<History[]>([])

  const { t } = useTranslation()

  const navigate = useNavigate()

  useEffect(() => {

    if (history) {

      const array = history.history.slice(-5).reverse();

      setList(array)

    }

  }, [history])

  if (list.length === 0) {
    return (
      <h2 className="text">{t("lastHistory.listClear")}</h2>
    )
  }

  return (
    <ul className={styles.list}>
      {list.map(item => {
        return (
          <li key={item.id}>
            <div className={styles.sectionList}>
              {item.type === "transfer" && <h2 className="text">{t("actionDashboard.transfer")} <FaPaperPlane /></h2>}
              {item.type === "deposit" && <h2 className="text">{t("actionDashboard.deposit")} <FaPlusCircle /></h2>}
              {item.type === "windtraw" && <h2 className="text">{t("actionDashboard.withdraw")} <FaMinusCircle /></h2>}
              {item.type === "loan" && <h2 className="text">Loan <FaHandHoldingUsd /></h2>}
            </div>
            <div className={styles.sectionList}>
              {item.type === "transfer" && item.recipient_number === account.account?.account_number && <h2 style={{ color: "green" }}>+{formatNumber(item.sum)}€</h2>}
              {item.type === "transfer" && item.recipient_number !== account.account?.account_number && <h2 style={{ color: "red" }}>-{formatNumber(item.sum)}€</h2>}
              {item.type === "deposit" && <h2 style={{ color: "green" }}>+{formatNumber(item.sum)}€</h2>}
              {item.type === "windtraw" && <h2 style={{ color: "red" }}>-{formatNumber(item.sum)}€</h2>}
            </div>
            <div className={styles.sectionList}>
              <button onClick={() => navigate(`/history/${item.id}`)} className={styles.button}>{t("lastHistory.btn")}</button>
            </div>
          </li>
        )
      })}
    </ul>
  )

}