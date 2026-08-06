
import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from "../../hooks/useUser"
import { useActions } from "../../hooks/useActions"
import { ErrorModal } from "../Error/ErrorModal"
import { NumericFormat } from "react-number-format";
import { useHistory } from '../../hooks/useHistory';

type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const Deposit = (props: Props) => {

  const { user } = useUser()

  const { setHistory } = useHistory()

  const { actions, actionsAction, dispatchActions } = useActions()

  return (
    <div className={styles.column}>

      {actions.error && <ErrorModal message={actions.error} />}

      <div className={styles.sections}>
        <NumericFormat
          value={actions.form.sum}
          thousandSeparator
          decimalScale={0}
          allowNegative={false}
          placeholder="sum deposit"
          onValueChange={(values) =>
            dispatchActions({
              type: "SET_FORM_FIELD",
              payload: {
                field: "sum",
                value: values.value,
              },
            })
          }
        />
      </div>
      <div className={styles.sections}>
        <button
          onClick={() => {
            if (Number(actions.form.sum) > 50000) {
              dispatchActions({ type: "SET_ERROR", payload: "Too large an amount for a single deposit!" })
              dispatchActions({ type: "RESET_FORM" })
              return
            }

            if (Number(actions.form.sum) === 0) {
              dispatchActions({ type: "SET_ERROR", payload: "To ensure the operation succeeds, do not leave the fields blank!" })
              dispatchActions({ type: "RESET_FORM" })
              return
            }

            actionsAction.changeBalance(user, Number(actions.form.sum), "deposit")
            setHistory("deposit", Number(actions.form.sum), actions.form.from , "")
            dispatchActions({ type: "RESET_FORM" })
            props.goActive("")

          }}
        >Deposit
        </button>
      </div>

      <div className={styles.sections}>
        <h2 className='textModalInside'>The maximum deposit amount is €50,000 per transaction!</h2>
      </div>
    </div>
  )
}