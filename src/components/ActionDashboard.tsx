import styles from '../styles/Dashboard.module.css'
import { FaPaperPlane } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useTranslation } from 'react-i18next';


type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const ActionDashboard = (props: Props) => {

  const { t } = useTranslation()


  return (
    <div className={styles.acions}>

      <div className={styles.actionsHeader}>
        <h2 className="title">{t("actionDashboard.title")}</h2>
      </div>

      <div className={styles.actionsBody}>
        <button onClick={() => props.goActive("transfer")} className='button'><FaPaperPlane />{t("actionDashboard.transfer")}</button>
        <button onClick={() => props.goActive("deposit")} className='button'><FaPlusCircle />{t("actionDashboard.deposit")}</button>
        <button onClick={() => props.goActive("windtraw")} className='button'><FaMinusCircle />{t("actionDashboard.withdraw")}</button>
        <div className='deativetedBtn'>
          <button
            disabled
            onClick={() => props.goActive("loan")} ><FaHandHoldingUsd />{t("actionDashboard.loan")}</button>
        </div>
      </div>


    </div>
  )
}