import { useContext } from "react";
import { ThemeContext } from "../state/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  const { theme, toggleTheme, navigationTheme } = context;
  const { colors } = navigationTheme;

  return {
    theme,
    toggleTheme,
    colors,
  };
};
