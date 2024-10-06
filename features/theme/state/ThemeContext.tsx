import React, { createContext, useState, useEffect } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import colors from "../constants/colors";
import { CustomTheme } from "../types";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  navigationTheme: CustomTheme;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  navigationTheme: NavigationDefaultTheme as CustomTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useSystemColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(
    systemColorScheme ?? "light"
  );

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme as "light" | "dark");
      } else {
        setTheme(systemColorScheme ?? "light");
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  useEffect(() => {
    AsyncStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const navigationTheme: CustomTheme =
    theme === "dark"
      ? {
          ...NavigationDarkTheme,
          colors: {
            ...NavigationDarkTheme.colors,
            background: colors.dark.background,
            text: colors.dark.text,
            tint: colors.dark.tint,
            heart: colors.dark.heart,
            pastelBackground: colors.dark.pastelBackground,
            primary: colors.dark.primary,
            secondary: colors.dark.secondary,
            accent: colors.dark.accent,
          },
        }
      : {
          ...NavigationDefaultTheme,
          colors: {
            ...NavigationDefaultTheme.colors,
            background: colors.light.background,
            text: colors.light.text,
            tint: colors.light.tint,
            heart: colors.light.heart,
            pastelBackground: colors.light.pastelBackground,
            primary: colors.light.primary,
            secondary: colors.light.secondary,
            accent: colors.light.accent,
          },
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, navigationTheme }}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
