import { AccountContext } from "../context/AccountContext";
import { useAccountState } from "../hooks/useAccountState";
import { useUser } from "../hooks/useUser";



export const AccountContextProviders = ({ children }: any) => {

  const { user } = useUser()

  const value = useAccountState(user);

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};