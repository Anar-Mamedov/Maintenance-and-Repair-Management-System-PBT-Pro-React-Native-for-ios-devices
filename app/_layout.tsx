import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme, SafeAreaView, StatusBar } from "react-native";
import { TamaguiProvider } from "tamagui";

import "../tamagui-web.css";

import { config } from "../tamagui.config";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  // telefon karanlık moda geçerse uygulamada karanlık modda açılıyor
  // const colorScheme = useColorScheme();

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    // <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
    //   <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <TamaguiProvider config={config} defaultTheme={"light" as any}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{}} />
          </Stack>
        </ThemeProvider>
      </SafeAreaView>
    </TamaguiProvider>
  );
}
