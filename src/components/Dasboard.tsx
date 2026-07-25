
import { useAccount } from "../hooks/useAccount"
import { useUser } from "../hooks/useUser"


export const Dashboard = () => {

  const { user, actionsUser } = useUser()

  const { account, dispatchAccount } = useAccount()

  return (
    <div>
      <h2>{user?.user_metadata.name}</h2>
      <h2>{account.account?.account_number}</h2>
    </div>
  )
}