import { useContext } from "react"
import { UsersContext } from "../context/UsersContext"

export const useUser = () => {

  const context = useContext(UsersContext)

  if (!context) {
    throw new Error("useUser must be used inside UsersContextProvider");
  }

  return context

}