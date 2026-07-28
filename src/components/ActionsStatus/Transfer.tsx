import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from '../../hooks/useUser'
import { ErrorModal } from '../Error/ErrorModal'
import { useActions } from '../../hooks/useActions'

export const Transfer = () => {


  const { user } = useUser()

  const { actions, actionsAction, dispatchActions } = useActions()

  return (
    <div className={styles.columnTransfer}>

      {actions.error && <ErrorModal message={actions.error} />}


      <div className={styles.containerSection}>
        <div className={styles.sections}>
          <input
            value={actions.form.sum}
            onChange={(e) => dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "sum", value: e.target.value } })}
            type="number"
            placeholder="transfer sum"
          />
        </div>

        <div className={styles.sections}>
          <input
            value={actions.form.from}
            onChange={(e) => dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "from", value: e.target.value } })}
            type="number"
            placeholder="number for transfer"
          />
        </div>
      </div>


      <div className={styles.sections}>
        <div className={styles.message}>
          <textarea
            value={actions.form.massege}
            onChange={(e) => dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "massege", value: e.target.value } })}
            placeholder="massege*(optional)"
          />
        </div>
      </div>


      <div className={styles.sections}>
        <button
          onClick={() => {
            actionsAction.transfer(user, actions.form.from, Number(actions.form.sum))
            dispatchActions({ type: "RESET_FORM" })
          }}
        >Transfer
        </button>
      </div>

      <div className={styles.sections}>
        <h2>Ensure that you have sufficient funds in your account to complete the transaction.</h2>
      </div>
    </div>
  )
}