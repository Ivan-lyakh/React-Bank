import { useState } from "react"
import { useAccount } from "../hooks/useAccount"
import styles from '../styles/ActionsModal.module.css'
import { ErrorModal } from "./Error/ErrorModal"
import { useTranslation } from "react-i18next"

type Props = {
  lock: React.Dispatch<React.SetStateAction<boolean>>
}
export const ActionsPIN = (props: Props) => {

  const { t } = useTranslation()

  const [value, setValue] = useState("")

  const { account, dispatchAccount } = useAccount()



  return (
    <div className={styles.pin}>

      {account.error && <ErrorModal message={account.error} />}

      <h2 className="textModalInside">{t("actionsControlPin.title")}</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, 4))}
        type="number"
        placeholder="PIN"
        maxLength={4}
      />

      <button onClick={() => {
        Number(value) === account.account?.PIN
          ? props.lock(false)
          : dispatchAccount({ type: "SET_ERROR", payload: t("actionsControlPin.error") }), setValue("")
      }}>{t("actionsControlPin.btn")}</button>

    </div>
  )
}