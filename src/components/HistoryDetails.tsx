import styles from '../styles/History.module.css'
import { useAccount } from "../hooks/useAccount"
import type { History } from "../types/HistoryTypes"
import { FaPaperPlane } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { HiArrowDown, HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { formatAccountNumber, formatNumber } from '../utils/DashboardHelpers';
import { formatDate } from '../utils/HistoryHelpers';
import { FaStar } from "react-icons/fa";


type Props = {
  data: History | null
}

export const HistoryDetails = (props: Props) => {

  const { account } = useAccount()

  console.log(account)

  console.log(props.data)


  if (props.data) {

    return (
      <div className={styles.mainDetails}>

        <div className={styles.id}>
          <h3>Transaction #{props.data.id}</h3>
        </div>

        <div className={styles.details}>
          <div className={styles.detailsHeader}>
            {props.data.type === "deposit" && <h2><FaPlusCircle color='white' fontSize={"45px"} />Deposit</h2>}
            {props.data.type === "windtraw" && <h2><FaMinusCircle color='white' fontSize={"40px"} />Withdraw</h2>}
            {props.data.type === "transfer" && <h2><FaPaperPlane color='white' fontSize={"35px"} />Transfer</h2>}
            {props.data.type === "loan" && <h2><FaHandHoldingUsd color='white' fontSize={"35px"} />Loan</h2>}
          </div>

          <div className={styles.detailsBody}>

            {
              props.data.type === "windtraw" &&
              <div className={styles.info}>

                <div className={styles.action}>
                  <h2 style={{ color: "red", paddingTop: "50px" }}>-{formatNumber(props.data.sum)}€</h2>
                </div>

                <div className={styles.infoBody}>
                  <div className={styles.row}>
                    <h2><span>Date:</span> {formatDate(props.data.created_at)}</h2>
                  </div>

                  <div className={styles.row}>
                    <h2><span>Account number:</span> {formatAccountNumber(props.data.sender_number)}</h2>
                  </div>
                </div>
              </div>
            }

            {
              props.data.type === "deposit" &&
              <div className={styles.info}>

                <div className={styles.action}>
                  <h2 style={{ color: "green", paddingTop: "50px" }}>+{formatNumber(props.data.sum)}€</h2>
                </div>

                <div className={styles.infoBody}>
                  <div className={styles.row}>
                    <h2><span>Date:</span> {formatDate(props.data.created_at)}</h2>
                  </div>

                  <div className={styles.row}>
                    <h2><span>Account number:</span> {formatAccountNumber(props.data.sender_number)}</h2>
                  </div>
                </div>
              </div>
            }

            {
              props.data.type === "transfer" &&
              <div className={styles.info}>

                <div className={styles.action}>
                  {props.data.recipient_number === account.account?.account_number
                    ?

                    <div>

                      <div className={styles.action}>
                        <h2 style={{ color: "green" }}>+{formatNumber(props.data.sum)}€</h2>
                      </div>

                      <div className={styles.transferAction}>
                        <h2>{formatAccountNumber(props.data.sender_number)}</h2>
                        <h2><HiArrowDown /></h2>
                        <h2 ><FaStar /> You</h2>
                      </div>
                    </div>
                    :
                    <div>

                      <div className={styles.action}>
                        <h2 style={{ color: "red" }}>-{formatNumber(props.data.sum)}€</h2>
                      </div>

                      <div>
                        <div className={styles.transferAction}>
                          <h2><FaStar /> You</h2>
                          <h2><HiArrowDown /></h2>
                          <h2>{formatAccountNumber(props.data.sender_number)}</h2>
                        </div>
                      </div>
                    </div>
                  }
                </div>

                <div className={styles.infoBody}>
                  <div className={styles.row}>
                    <h2><span>Date:</span> {formatDate(props.data.created_at)}</h2>
                  </div>

                </div>
              </div>
            }

          </div>

        </div>

      </div>
    )

  }

}