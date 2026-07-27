import styles from '../styles/Dashboard.module.css'
import { handleCopy, formatNumber } from '../utils/DashboardHelpers'
import cardIcon from '../images/card.png'
import copyIcon from '../images/copy.png'
import { useUser } from '../hooks/useUser'
import { useAccount } from '../hooks/useAccount'

export const CardDashboard = () => {

  const { user } = useUser()

  const { account } = useAccount()

  return (

    <div className={styles.card}>

      <div className={styles.cardHeader}>
        <h2 className="text">Main account</h2>
      </div>


      <div className={styles.cardNumber}>
        <h2>
          <img src={cardIcon} alt="#" />
          {account.account?.account_number}
          <img className={styles.copy} onClick={() => handleCopy(String(account.account?.account_number))} src={copyIcon} alt="№" /></h2>
      </div>

      <div className={styles.cardBalance}>
        <h2>Balance: <span>{formatNumber(Number(account.account?.balance))}€</span></h2>

      </div>

    </div>
  )
}