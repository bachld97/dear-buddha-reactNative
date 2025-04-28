import { Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context'

import { AppEventTracker } from "@/domain/tracking/AppEventTracker";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const pathname = usePathname();

  useEffect(() => {
    AppEventTracker.logScreenView(pathname);
  }, [pathname])


  return (
    <KeyboardProvider>
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index"
          options={{
            title: '', headerShown: false
          }}
        />
        <Stack.Screen name="moodInput"
          options={{
            title: '', headerShown: false
          }}
        />
        <Stack.Screen name="wisdomDetail"
          options={{
            title: 'Ask Budhha',
            headerShown: false
          }}
        />
        <Stack.Screen name="wisdomDetailNew"
          options={{
            title: 'Ask Budhha new',
            headerShown: false
          }}
        />
        <Stack.Screen name="wisdomRespondStandalone"
          options={{
            title: '', headerShown: false
          }}
        />
        <Stack.Screen name="wisdomBookmark"
          options={{
            title: '', headerShown: false
          }}
        />
      </Stack>
    </SafeAreaProvider>
    </KeyboardProvider>
  );
}
