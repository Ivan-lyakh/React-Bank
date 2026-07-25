import { useAccount } from "../hooks/useAccount"
import { useUser } from "../hooks/useUser"

export const Setteding = () => {

  const { actionsUser } = useUser()

  const { dispatchAccount } = useAccount()

  return (
    <div>
      <h2>Setteding</h2>
      <button onClick={() => {
        actionsUser.handleLogout()
        dispatchAccount({ type: "RESET_ACCOUNT" })
      }}>Выйти</button>
    </div>
  )
}