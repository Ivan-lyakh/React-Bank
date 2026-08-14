
import styles from '../ActionsStatus/ActionStatus.module.css'

import { useUser } from "../../hooks/useUser"
import { useActions } from "../../hooks/useActions"
import { useHistory } from '../../hooks/useHistory';
import { useTranslation } from 'react-i18next';

import { ErrorModal } from "../Error/ErrorModal"
import { NumericFormat } from "react-number-format";


type Props = {
  goActive: React.Dispatch<React.SetStateAction<string>>
}

export const Deposit = (props: Props) => {

  const { t } = useTranslation()

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
          placeholder={t("deposit.placeholder")}
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
              dispatchActions({ type: "SET_ERROR", payload: t("deposit.errorBigDeposit") })
              dispatchActions({ type: "RESET_FORM" })
              return
            }

            if (Number(actions.form.sum) === 0) {
              dispatchActions({ type: "SET_ERROR", payload: t("transfer.errorBlank") })
              dispatchActions({ type: "RESET_FORM" })
              return
            }

            actionsAction.changeBalance(user, Number(actions.form.sum), "deposit")
            setHistory("deposit", Number(actions.form.sum), actions.form.from , "")
            dispatchActions({ type: "RESET_FORM" })
            props.goActive("")

          }}
        >{t("deposit.btn")}
        </button>
      </div>

      <div className={styles.sections}>
        <h2 className='textModalInside'>{t("deposit.lastTitle")}</h2>
      </div>
    </div>
  )
}