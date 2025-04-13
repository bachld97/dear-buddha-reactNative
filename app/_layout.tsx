import { Stack } from "expo-router";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets
} from 'react-native-safe-area-context'
import WisdomDetail from "./wisdomDetail";
import Index from "./index";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index"
          options={{
            title: '', headerShown: false
          }}
        />
        <Stack.Screen name="wisdomDetail"
          options={{
            title: 'Ask Budhha', headerShown: false
          }}
        />
        <Stack.Screen name="wisdomBookmark"
          options={{
            title: '', headerShown: false
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
