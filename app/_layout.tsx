import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context'
import { firebase } from "@react-native-firebase/analytics"

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const defaultAppAnalytics = firebase.analytics();
  defaultAppAnalytics.logEvent('hello_world')

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
