import { ActionsContext } from "../context/ActionsContext";
import { useAccount } from "../hooks/useAccount";
import { useActionsState } from "../hooks/useActionsState";



export const ActionsContextProvider = ({ children }: any) => {

  const { account, loadAccount } = useAccount()

  const value = useActionsState(account.account, loadAccount);

  return (
    <ActionsContext.Provider value={value}>
      {children}
    </ActionsContext.Provider>
  );
};