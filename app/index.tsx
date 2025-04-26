import {
  StyleSheet,
  ImageBackground,
  Text, View,
  TouchableOpacity,
} from "react-native";

import { AppNavigator } from "@/domain/navigator/AppNavigator";
import {
  useSafeAreaInsets
} from 'react-native-safe-area-context'
import { useRouter } from "expo-router";
import { Colors } from '@/constants/Colors';

import { EntranceAnimatorWrap } from "@/components/EntranceAnimatorWrap";

export default function Index() {

  const buddhaImage = require('@/assets/splash-icon2.png')
  // const buddhaImage = require('@/assets/images/splash-icon.png')

  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ImageBackground source={buddhaImage}
      resizeMode="cover"
      style={styles.backgroundImage}>

      <View style={styles.container}>
        <EntranceAnimatorWrap
          style={styles.btn} yPosStart={700} yPosEnd={650} animDuraion={700}
        >

          <TouchableOpacity style={{
          }}
            onPress={() => {
              AppNavigator.openMoodInput(router)
            }}
          >
            <Text style={styles.title}>🙏</Text>
          </TouchableOpacity>

        </EntranceAnimatorWrap>

      </View>

    </ImageBackground>
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: Colors.appGreen,
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    padding: 24
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
  },

  backgroundImage: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})