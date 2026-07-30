import { useEffect } from "react"
import { Dashboard } from "../components/Dasboard"
import { useAccount } from "../hooks/useAccount"
import { useUser } from "../hooks/useUser"
import { useHistory } from "../hooks/useHistory"


export const HomePage = () => {

  const { user } = useUser()

  const { loadAccount } = useAccount()

  const { loadHistory } = useHistory()

  if (user) {
    useEffect(() => {
      loadAccount(user)
      loadHistory()
    }, [user])
  }

  return <Dashboard />

}