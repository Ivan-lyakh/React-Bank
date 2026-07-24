import { UsersContext } from "../context/UsersContext"
import { useAuth } from "../hooks/useAuth"



export const UsersContextProviders = ({ children }: any) => {
  const value = useAuth();

  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  );
};