import { createContext } from "react"

type ThemeContextType = {
  theme: string,
  toggleTheme: () => void
}

export const ThemeContext = createContext<null | ThemeContextType>(null);