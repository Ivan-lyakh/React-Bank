import { useState } from "react"
import { useAccount } from "../hooks/useAccount"
import styles from '../styles/ActionsModal.module.css'
import { ErrorModal } from "./Error/ErrorModal"

type Props = {
  lock: React.Dispatch<React.SetStateAction<boolean>>
}
export const ActionsPIN = (props: Props) => {

  const [value, setValue] = useState("")

  const { account, dispatchAccount } = useAccount()

  console.log(account.account?.PIN)

  return (
    <div className={styles.pin}>

      {account.error && <ErrorModal message={account.error} />}

      <h2 className="text">For your safety and to verify your identity, please enter your account PIN.</h2>

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
          : dispatchAccount({ type: "SET_ERROR", payload: "PIN is not corrected , pleasy try again!" }) , setValue("")
      }}>Control</button>

    </div>
  )
}