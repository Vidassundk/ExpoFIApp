import React, { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { LikesProvider } from "@/features/comminuty/state/LikesContext";
import { ThemeProvider } from "@/features/theme/state/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BookmarksProvider } from "@/features/courses/state/BookmarksContext";
export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontLoadingError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontLoadingError) throw fontLoadingError;
  }, [fontLoadingError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LikesProvider>
          <BookmarksProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </BookmarksProvider>
        </LikesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
