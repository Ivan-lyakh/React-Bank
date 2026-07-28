import { useContext } from "react"
import { ActionsContext } from "../context/ActionsContext"

export const useActions = () => {

  const context = useContext(ActionsContext)

  if (!context) {
    throw new Error("useActions must be used inside ActionsContextProvider");
  }

  return context

}