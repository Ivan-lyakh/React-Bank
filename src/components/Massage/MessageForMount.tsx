import { MdCheck } from "react-icons/md";
import styles from "./Notification.module.css";
import type { History } from "../../types/HistoryTypes";
import { changeStatusRead, formatNumber } from "../../utils/DashboardHelpers";
import { formatDate } from "../../utils/HistoryHelpers";
import { useTranslation } from "react-i18next";


type Props = {
  message: string,
  setNewTransfer: React.Dispatch<React.SetStateAction<History | null>>
  newTransfer: History
};

export const MessageForMount = (props: Props) => {


  const { t } = useTranslation()

  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          <MdCheck color="white" />
        </div>

        <h2>{t("messageFromMount.title")}</h2>

        <h2 style={{ color: "green" }}>+{formatNumber(props.newTransfer.sum)}€</h2>

        <p>
          {t("messageFromMount.from")}: {props.newTransfer.sender_name}
        </p>

        <p>
          {t("messageFromMount.date")}: {formatDate(props.newTransfer.created_at)}
        </p>

        <p style={{ borderTop: "1px solid grey", padding: "15px 0px 0px 0px" }}>
          {t(props.message ? props.message : "messageFromMount.massage")}
        </p>

        <button
          onClick={() => {
            changeStatusRead(props.newTransfer)
            props.setNewTransfer(null)
          }}
          className="button">
          {t("messageFromMount.btn")}
        </button>

      </div>
    </div>
  );
};