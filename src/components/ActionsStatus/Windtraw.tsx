import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from '../../hooks/useUser'
import { useActions } from '../../hooks/useActions'
import { ErrorModal } from '../Error/ErrorModal'
import { useAccount } from '../../hooks/useAccount'

export const Windtraw = () => {

  const { user } = useUser()

  const { account } = useAccount()

  const { actions, actionsAction, dispatchActions } = useActions()

  return (
    <div className={styles.column}>

      {actions.error && <ErrorModal message={actions.error} />}


      <div className={styles.sections}>
        <input
          value={actions.form.sum}
          onChange={(e) => dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "sum", value: e.target.value } })}
          type="number"
          placeholder="sum windtraw"
        />
      </div>
      <div className={styles.sections}>
        <button
          onClick={() => {

            if (account.account) {

              if (account.account.balance < Number(actions.form.sum)) {
                dispatchActions({ type: "SET_ERROR", payload: "Ensure that you have sufficient funds in your account to complete the transaction." })
                return
              }

              if (Number(actions.form.sum) === 0) {
                dispatchActions({ type: "SET_ERROR", payload: "To ensure the operation succeeds, do not leave the fields blank!" })
                return
              }

              actionsAction.changeBalance(user, Number(actions.form.sum), "windtraw")
              dispatchActions({ type: "RESET_FORM" })
            }

          }}
        >Windtraw
        </button>
      </div>

      <div className={styles.sections}>
        <h2>Ensure that you have sufficient funds in your account to complete the transaction.</h2>
      </div>
    </div>
  )
}