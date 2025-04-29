import {
  StyleSheet,
  ImageBackground,
  Text, View,
  TouchableOpacity,
} from "react-native";

import { AppNavigator } from "@/domain/navigator/AppNavigator";
import { useRouter } from "expo-router";
import { Colors } from '@/constants/Colors';

import { useEffect } from "react";

import { Audio } from 'expo-av';
import AppAudioManager from "@/domain/av/AppAudioManager";

const audioSource = require('@/assets/test_audio.mp3');

export default function Index() {
  const buddhaImage = require('@/assets/splash-icon2.png')

  const router = useRouter();

  const playSound = async () => {
    await AppAudioManager.getInstance().play(audioSource)
  }

  useEffect(() => {
    setTimeout(async () => {
      await playSound()

      setTimeout(async () => {
        AppNavigator.openMoodInput(router); 
      }, 3000);

    }, 500);


  }, [])

  return (
    <ImageBackground source={buddhaImage}
      resizeMode="cover"
      style={styles.backgroundImage}>
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