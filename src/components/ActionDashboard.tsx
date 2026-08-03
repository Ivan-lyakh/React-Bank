import styles from '../styles/Dashboard.module.css'
import { FaPaperPlane } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";


type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const ActionDashboard = (props: Props) => {
  return (
    <div className={styles.acions}>

      <div className={styles.actionsHeader}>
        <h2 className="title">Actions</h2>
      </div>

      <div className={styles.actionsBody}>
        <button onClick={() => props.goActive("transfer")} className='button'><FaPaperPlane />Transfer</button>
        <button onClick={() => props.goActive("deposit")} className='button'><FaPlusCircle />Deposit</button>
        <button onClick={() => props.goActive("windtraw")} className='button'><FaMinusCircle />Withdraw</button>
        <div className='deativetedBtn'>
          <button
          className='button'
          disabled
          onClick={() => props.goActive("loan")} ><FaHandHoldingUsd />Get a loan</button>
        </div>
      </div>


    </div>
  )
}