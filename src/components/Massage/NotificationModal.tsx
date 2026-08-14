import styles from "./Notification.module.css";

import { MdCheck } from "react-icons/md";

import { useActions } from "../../hooks/useActions";
import { useTranslation } from "react-i18next";

type Props = {
  message: string;
};

export const MassegeModal = ({ message }: Props) => {

  const { t } = useTranslation()

  const { dispatchActions } = useActions()


  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          <MdCheck color="white" />
        </div>

        <h2>{t("notificationModal.title")}</h2>

        <p>{message}</p>

        <button
          onClick={() => {
            dispatchActions({ type: "RESET_FORM" })
          }}
          className="button">
          Ok
        </button>

      </div>
    </div>
  );
};