
import { HistoryContext } from "../context/HistoryContext";
import { useAccount } from "../hooks/useAccount";
import { useHistoryState } from "../hooks/useHistoryState";
import { useUser } from "../hooks/useUser";



export const HistoryContextProvider = ({ children }: any) => {

  const { account } = useAccount()

  const { user } = useUser()

  const value = useHistoryState(account.account, user);

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};