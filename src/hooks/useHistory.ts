import { useContext } from "react"
import { HistoryContext } from "../context/HistoryContext";

export const useHistory = () => {

  const context = useContext(HistoryContext)

  if (!context) {
    throw new Error("useHistory must be used inside HisttoryContextProvider");
  }

  return context

}