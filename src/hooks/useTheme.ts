import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const useTheme = () => {

  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useActions must be used inside ThemeContextProvider");
  }

  return context

}