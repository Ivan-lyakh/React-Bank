import { AccountContext } from "../context/AccountContext";
import { useAccountState } from "../hooks/useAccountState";



export const AccountContextProviders = ({ children }: any) => {

  const value = useAccountState();

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};