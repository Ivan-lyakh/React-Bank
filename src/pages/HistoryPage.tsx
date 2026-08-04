import { useEffect } from "react"
import { useAccount } from "../hooks/useAccount"
import { useUser } from "../hooks/useUser"
import { useHistory } from "../hooks/useHistory"
import { AllHistory } from "../components/AllHistory"


export const HistoryPage = () => {

  const { user } = useUser()

  const { loadAccount, account } = useAccount()

  const { loadHistory } = useHistory()

  useEffect(() => {
    if (!user) return;

    loadAccount();
  }, [user]);

  useEffect(() => {
    if (!account.account) return;

    loadHistory(account.account.account_number);
  }, [account.account]);


  return <AllHistory />

}



