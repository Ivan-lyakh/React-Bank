import { useEffect, useState } from "react";

export const useThemeState = () => {



  const [theme, setTheme] = useState(() => {

    return localStorage.getItem("themeReactBank") || "light";
  });

  console.log(localStorage.getItem("themeReactBank"))


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("themeReactBank", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => prev === "light" ? "dark" : "light");
  }

  return {
    theme,
    toggleTheme,
  };
};