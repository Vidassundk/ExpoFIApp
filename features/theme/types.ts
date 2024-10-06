import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";

export interface CustomTheme extends NavigationTheme {
  colors: NavigationTheme["colors"] & {
    tint: string;
    heart: string;
    pastelBackground: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}
