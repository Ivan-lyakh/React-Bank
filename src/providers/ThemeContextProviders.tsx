import { useThemeState } from "../hooks/useThemeState"
import { ThemeContext } from "../context/ThemeContext"


export const ThemeContextProvider = ({ children }: any) => {


  const value = useThemeState()

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )

}