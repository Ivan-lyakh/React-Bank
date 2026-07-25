import { useContext } from "react"
import { AccountContext } from "../context/AccountContext";

export const useAccount = () => {

  const context = useContext(AccountContext)

  if (!context) {
    throw new Error("useAccount must be used inside AccountContextProvider");
  }

  return context

}