import { useUser } from "../../hooks/useUser";
import styles from "./Error.module.css";

type Props = {
  message: string;
};

export const ErrorModal = ({ message }: Props) => {

  const { auth, dispatch } = useUser()

  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          !
        </div>

        <h2>Ошибка</h2>

        <p>{message}</p>

        <button
          onClick={() => dispatch({ type: "CHANGE_ERROR", payload: "" })}
          className="button">
          Закрыть
        </button>

      </div>
    </div>
  );
};