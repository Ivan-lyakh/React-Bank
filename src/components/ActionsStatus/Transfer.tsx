import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from '../../hooks/useUser'
import { ErrorModal } from '../Error/ErrorModal'
import { useActions } from '../../hooks/useActions'
import { useAccount } from '../../hooks/useAccount'
import { NumericFormat } from 'react-number-format'
import { PatternFormat } from 'react-number-format'
import { useHistory } from '../../hooks/useHistory'

type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const Transfer = (props: Props) => {


  const { user } = useUser()

  const { setHistory } = useHistory()

  const { actions, actionsAction, dispatchActions } = useActions()

  const { account } = useAccount()

  console.log(actions.form.massege)

  return (
    <div className={styles.columnTransfer}>

      {actions.error && <ErrorModal message={actions.error} />}


      <div className={styles.containerSection}>
        <div className={styles.sections}>
          <NumericFormat
            value={actions.form.sum}
            thousandSeparator
            decimalScale={0}
            allowNegative={false}
            placeholder="transfer sum"
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
          <PatternFormat
            value={actions.form.from}
            format="#### #### #### ####"
            mask=""
            allowEmptyFormatting={false}
            placeholder="number for transfer"
            onValueChange={(values) =>
              dispatchActions({
                type: "SET_FORM_FIELD",
                payload: {
                  field: "from",
                  value: values.value, // В Redux сохранится без пробелов!
                },
              })
            }
          />
        </div>
      </div>


      <div className={styles.sections}>
        <div className={styles.message}>
          <textarea
            maxLength={100}
            value={actions.form.massege}
            onChange={(e) => dispatchActions({ type: "SET_FORM_FIELD", payload: { field: "massege", value: e.target.value } })}
            placeholder="massege*(optional) max 100 characters"
          />
        </div>
      </div>


      <div className={styles.sections}>
        <button
          onClick={() => {

            if (account.account) {

              if (account.account.balance < Number(actions.form.sum)) {
                dispatchActions({ type: "SET_ERROR", payload: "Insufficient funds to complete the transaction!" })
                return
              }

              if (Number(actions.form.sum) === 0) {
                dispatchActions({ type: "SET_ERROR", payload: "To ensure the operation succeeds, do not leave the fields blank!" })
                return
              }


              actionsAction.transfer(user, actions.form.from, Number(actions.form.sum))
              console.log(actions.form.from)
              setHistory("transfer", Number(actions.form.sum), actions.form.from, actions.form.massege)
              dispatchActions({ type: "RESET_FORM" })
              props.goActive("")
            }

          }
          }
        >Transfer
        </button>
      </div>

      <div className={styles.sections}>
        <h2>Ensure that you have sufficient funds in your account to complete the transaction.</h2>
      </div>
    </div>
  )
}