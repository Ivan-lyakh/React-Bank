import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from '../../hooks/useUser'
import { useActions } from '../../hooks/useActions'
import { ErrorModal } from '../Error/ErrorModal'
import { useAccount } from '../../hooks/useAccount'
import { NumericFormat } from 'react-number-format'
import { useHistory } from '../../hooks/useHistory'
import { useTranslation } from 'react-i18next'

type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}



export const Windtraw = (props: Props) => {

  const { t } = useTranslation()

  const { user } = useUser()

  const { setHistory } = useHistory()

  const { account } = useAccount()

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
          placeholder={t("removal.placeholder")}
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

            if (account.account) {

              if (account.account.balance < Number(actions.form.sum)) {
                dispatchActions({ type: "SET_ERROR", payload: t("removal.errorBigRemoval") })
                dispatchActions({ type: "RESET_FORM" })
                return
              }

              if (Number(actions.form.sum) === 0) {
                dispatchActions({ type: "SET_ERROR", payload: t("transfer.errorBlank") })
                dispatchActions({ type: "RESET_FORM" })
                return
              }

              actionsAction.changeBalance(user, Number(actions.form.sum), "windtraw")
              setHistory("windtraw", Number(actions.form.sum), actions.form.from, "")
              dispatchActions({ type: "RESET_FORM" })
              props.goActive("")
            }

          }}
        >{t("removal.btn")}
        </button>
      </div>

      <div className={styles.sections}>
        <h2 className='textModalInside'>{t("removal.lastTitle")}</h2>
      </div>
    </div>
  )
}