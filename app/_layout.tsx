import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context'

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
