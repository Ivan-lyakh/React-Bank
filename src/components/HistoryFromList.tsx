import type { History } from "../types/HistoryTypes"
import styles from "../styles/History.module.css"
import { formatDate } from "../utils/HistoryHelpers"
import { formatNumber } from "../utils/DashboardHelpers"
import { formatAccountNumber } from "../utils/DashboardHelpers"
import { FaStar } from "react-icons/fa";
import { useAccount } from "../hooks/useAccount"

type Props = {
  data: History
}

export const HistoryFromList = (props: Props) => {

  const { account } = useAccount()

  console.log(account)

  return (
    <div className={styles.table}>

      <div className={styles.section}>
        <h2>{formatDate(props.data.created_at)}</h2>
      </div>

      <div className={styles.section}>
        <h2>{props.data.type}</h2>
      </div>

      <div className={styles.section}>
        <h2>
          {props.data.type === "deposit" && <span style={{ color: "green" }}>+{formatNumber(props.data.sum)}€</span> ||
            props.data.type === "windtraw" && <span style={{ color: "red" }}>-{formatNumber(props.data.sum)}€</span> ||
            props.data.type === "transfer" && account.account?.account_number === props.data.recipient_number
            ? <span style={{ color: "green" }}>+{formatNumber(props.data.sum)}€</span>
            : <span style={{ color: "red" }}>-{formatNumber(props.data.sum)}€</span>}

        </h2>
      </div>

      <div className={styles.section}>
        {props.data.type !== "transfer"
          ? <h2>-</h2>
          :
          <div className={styles.senderBox}>
            {account.account?.account_number === props.data.sender_number ? <span className={styles.star}><FaStar /> You</span> : <h2>{formatAccountNumber(props.data.sender_number)}</h2>}
          </div>
        }
      </div>

      <div className={styles.section}>
        {props.data.type !== "transfer"
          ? <h2>-</h2>
          :
          <div className={styles.senderBox}>
            {account.account?.account_number === props.data.recipient_number ? <span className={styles.star}><FaStar /> You</span> : <h2>{formatAccountNumber(props.data.recipient_number)}</h2>}
          </div>
        }
      </div>

    </div>
  )
}