import { useAccount } from "../../hooks/useAccount";
import { useUser } from "../../hooks/useUser";
import styles from "./Error.module.css";

type Props = {
  message: string;
};

export const ErrorModal = ({ message }: Props) => {

  const { dispatch } = useUser()
  const { dispatchAccount } = useAccount()

  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          !
        </div>

        <h2>Error</h2>

        <p>{message}</p>

        <button
          onClick={() => {
            dispatch({ type: "CHANGE_ERROR", payload: "" })
            dispatchAccount({ type: "SET_ERROR", paylod: "" })
          }}
          className="button">
          Closed
        </button>

      </div>
    </div>
  );
};