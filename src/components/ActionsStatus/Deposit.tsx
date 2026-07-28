
import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from "../../hooks/useUser"
import { useActions } from "../../hooks/useActions"
import { ErrorModal } from "../Error/ErrorModal"

export const Deposit = () => {

  const { user } = useUser()

  const { actions, actionsAction, dispatchActions } = useActions()

  return (
    <div className={styles.column}>

      {actions.error && <ErrorModal message={actions.error} />}

      <div className={styles.sections}>
        <input
          value={actions.form.sum}
          onChange={(e) => dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "sum", value: e.target.value } })}
          type="number"
          placeholder="sum deposit"
        />
      </div>
      <div className={styles.sections}>
        <button
          onClick={() => {
            if (Number(actions.form.sum) > 50000) {
              dispatchActions({ type: "SET_ERROR", payload: "Too large an amount for a single deposit!" })

              return
            }

            if (Number(actions.form.sum) === 0) {
              dispatchActions({ type: "SET_ERROR", payload: "To ensure the operation succeeds, do not leave the fields blank!" })
              return
            }

            actionsAction.changeBalance(user, Number(actions.form.sum), "deposit")
            dispatchActions({ type: "RESET_FORM" })

          }}
        >Deposit
        </button>
      </div>

      <div className={styles.sections}>
        <h2>The maximum deposit amount is €50,000 per transaction!</h2>
      </div>
    </div>
  )
}