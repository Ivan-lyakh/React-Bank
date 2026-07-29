import { MdCheck } from "react-icons/md";
import styles from "./Notification.module.css";
import { useActions } from "../../hooks/useActions";

type Props = {
  message: string;
};

export const MassegeModal = ({ message }: Props) => {

  const { dispatchActions } = useActions()


  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          <MdCheck color="white" />
        </div>

        <h2>Notification</h2>

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