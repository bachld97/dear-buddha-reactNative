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
import { useEffect } from "react";

import { Audio } from 'expo-av';
import { Sound} from "expo-av/build/Audio";

const audioSource = require('@/assets/bell.mp3');


export default function Index() {
  const buddhaImage = require('@/assets/splash-icon2.png')

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const playSound = async () => {
    let soundObj = await Audio.Sound.createAsync(
      audioSource
    )
    const sound = soundObj.sound
    await sound.setVolumeAsync(0.5)
    await sound.playAsync()

    setTimeout(async () => {
      await fadeOut(sound); // Fade out after 3 seconds
    }, 3000);
  }

  async function fadeOut(soundObject: Sound, duration = 1000) {
    if (!soundObject) return;
  
    const initialVolume = 0.5
    const steps = 20;
    const delay = duration / steps;
  
    for (let i = steps; i >= 0; i--) {
      const volume = initialVolume * (i / steps);
      await soundObject.setVolumeAsync(volume);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    await soundObject.pauseAsync();
    await soundObject.setPositionAsync(0); // Optional: reset to beginning
    await soundObject.unloadAsync()
  }

  useEffect(() => {
    setTimeout(async () => {
      await playSound()
    }, 500); 
  }, [])

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