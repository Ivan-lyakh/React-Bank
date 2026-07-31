import { useUser } from "../hooks/useUser"
import { useEffect } from "react"
import { useAccount } from "../hooks/useAccount"
import { useHistory } from "../hooks/useHistory"
import { AllHistory } from "../components/AllHistory"


export const HistoryPage = () => {

  const { user } = useUser()

  const { account, loadAccount } = useAccount()

  const { loadHistory } = useHistory()

  if (user) {
    useEffect(() => {
      loadAccount(user)
      loadHistory(account.account)
    }, [user])
  }

  return <AllHistory />

}