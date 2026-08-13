import styles from '../ActionsStatus/ActionStatus.module.css'
import { useUser } from '../../hooks/useUser'
import { ErrorModal } from '../Error/ErrorModal'
import { useActions } from '../../hooks/useActions'
import { useAccount } from '../../hooks/useAccount'
import { NumericFormat } from 'react-number-format'
import { PatternFormat } from 'react-number-format'
import { useHistory } from '../../hooks/useHistory'
import { useTranslation } from 'react-i18next'

type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const Transfer = (props: Props) => {

  const { t } = useTranslation()

  const { user } = useUser()

  const { setHistory } = useHistory()

  const { actions, actionsAction, dispatchActions } = useActions()

  const { account } = useAccount()

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
            placeholder={t("transfer.placeholder1")}
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
            placeholder={t("transfer.placeholder2")}
            onValueChange={(values) =>
              dispatchActions({
                type: "SET_FORM_FIELD",
                payload: {
                  field: "from",
                  value: values.value,
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
            placeholder={t("transfer.placeholder3")}
          />
        </div>
      </div>


      <div className={styles.sections}>
        <button
          onClick={async () => {

            if (account.account) {

              if (account.account.balance < Number(actions.form.sum)) {
                dispatchActions({ type: "SET_ERROR", payload: t("transfer.errorBalance") })
                dispatchActions({ type: "RESET_FORM" })
                return
              }

              if (Number(actions.form.sum) === 0) {
                dispatchActions({ type: "SET_ERROR", payload: t("transfer.errorBlank") })
                dispatchActions({ type: "RESET_FORM" })
                return
              }

              if (await actionsAction.transfer(user, actions.form.from, Number(actions.form.sum))) {
                setHistory(
                  "transfer",
                  Number(actions.form.sum),
                  actions.form.from,
                  actions.form.massege
                )

                props.goActive("")
              }

            }

          }}
        >
          {t("actionDashboard.transfer")}
        </button>
      </div>

      <div className={styles.sections}>
        <h2 className='textModalInside'>{t("transfer.lastTitle")}</h2>
      </div>
    </div>
  )
}