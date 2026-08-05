import { MdCheck } from "react-icons/md";
import styles from "./Notification.module.css";
import type { History } from "../../types/HistoryTypes";
import { changeStatusRead,  formatNumber } from "../../utils/DashboardHelpers";
import { formatDate } from "../../utils/HistoryHelpers";


type Props = {
  message: string,
  setNewTransfer: React.Dispatch<React.SetStateAction<History | null>>
  newTransfer: History
};

export const MessageForMount = (props: Props) => {


  console.log(props.newTransfer.id)

  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          <MdCheck color="white" />
        </div>

        <h2>Incoming transfer</h2>

        <h2 style={{ color: "green" }}>+{formatNumber(props.newTransfer.sum)}€</h2>

        <p>
          From: {props.newTransfer.sender_name}
        </p>

        <p>
          Date: {formatDate(props.newTransfer.created_at)}
        </p>

        <p style={{ borderTop: "1px solid grey", padding: "15px 0px 0px 0px" }}>
          {props.message
            ? props.message
            : "New transfer"
          }
        </p>

        <button
          onClick={() => {
            changeStatusRead(props.newTransfer)
            props.setNewTransfer(null)
          }}
          className="button">
          Continue
        </button>

      </div>
    </div>
  );
};