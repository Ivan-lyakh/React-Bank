import { useAccount } from "../hooks/useAccount"
import { useTheme } from "../hooks/useTheme"
import { useUser } from "../hooks/useUser"

export const Setteding = () => {

  const { actionsUser } = useUser()

  const { dispatchAccount } = useAccount()

  const { toggleTheme } = useTheme()

  return (
    <div>
      <h2>Setteding</h2>
      <button onClick={() => {
        actionsUser.handleLogout()
        dispatchAccount({ type: "RESET_ACCOUNT" })
      }}>Выйти</button>
      <button onClick={() => toggleTheme()}>Смена темы!</button>
    </div>
  )
}