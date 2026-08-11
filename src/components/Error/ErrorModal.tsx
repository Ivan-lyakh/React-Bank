import { useNavigate } from "react-router-dom";
import { useAccount } from "../../hooks/useAccount";
import { useActions } from "../../hooks/useActions";
import { useUser } from "../../hooks/useUser";
import styles from "./Error.module.css";


type Props = {
  message: string;
};

export const ErrorModal = (props: Props) => {

  const navigate = useNavigate()

  const { dispatch } = useUser()
  const { dispatchAccount } = useAccount()
  const { dispatchActions } = useActions()

  return (
    <div className={styles.overlay}>
      <div className={styles.errorBox}>

        <div className={styles.icon}>
          !
        </div>

        <h2>Error</h2>

        <p>{props.message}</p>

        <button
          onClick={() => {

            if (props.message === "History not found!") {
              navigate("/history")
            }

            dispatch({ type: "CHANGE_ERROR", payload: "" })
            dispatchAccount({ type: "SET_ERROR", payload: "" })
            dispatchActions({ type: "SET_ERROR", payload: "" })
          }}
          className="button">
          Closed
        </button>

      </div>
    </div>
  );
};