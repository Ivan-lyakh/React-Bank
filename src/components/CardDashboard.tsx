import styles from '../styles/Dashboard.module.css'

import { useTranslation } from 'react-i18next'
import { useAccount } from '../hooks/useAccount'

import { handleCopy, formatNumber } from '../utils/DashboardHelpers'
import cardIcon from '../images/card.png'
import copyIcon from '../images/copy.png'
import { formatAccountNumber } from '../utils/DashboardHelpers'

export const CardDashboard = () => {

  const { account } = useAccount()

  const { t } = useTranslation()

  return (

    <div className={styles.card}>

      <div className={styles.cardHeader}>
        <h2 className="text">{t("cardDashboard.account")}</h2>
      </div>


      <div className={styles.cardNumber}>
        <h2>
          <img src={cardIcon} alt="#" />
          {formatAccountNumber(account.account?.account_number ?? "")}
          <img className={styles.copy} onClick={() => handleCopy(String(account.account?.account_number) , t("cardDashboard.copyMassege"))} src={copyIcon} alt="№" /></h2>
      </div>

      <div className={styles.cardBalance}>
        <h2>{t("cardDashboard.balance")}: <span>{formatNumber(Number(account.account?.balance))}€</span></h2>

      </div>

    </div>
  )
}