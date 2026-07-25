import { useEffect } from "react"
import { Dashboard } from "../components/Dasboard"
import { useAccount } from "../hooks/useAccount"
import { useUser } from "../hooks/useUser"


export const HomePage = () => {

  const { user } = useUser()

  const { accoutActions } = useAccount()

  if (user) {
    useEffect(() => {
      accoutActions.loadAccount(user)
    }, [user])
  }

  return <Dashboard />

}