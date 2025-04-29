import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { AVPlaybackSource } from 'expo-av';

let instance: AppAudioManager

class AppAudioManager {
  sound?: Sound
  isMute: boolean

  private constructor() {
    instance = this;
    this.isMute = false;
    return instance;
  }

  async play(audio: AVPlaybackSource, volume: number = 0.6) {
    if (this.sound !== undefined) {
      await this.sound.unloadAsync()
    }
    this.sound = (await Audio.Sound.createAsync(audio)).sound
    if (this.isMute) {
      await this.mute()
    } else {
      await this.sound.setVolumeAsync(volume)
    }
    await this.sound.setIsLoopingAsync(true)
    await this.sound.playFromPositionAsync(0)
  }

  async toggleMute() {
    if (this.isMute) {
      await this.unMute()
    } else {
      await this.mute()
    }
  }

  async mute() {
    this.isMute = true
    this.sound?.setVolumeAsync(0)
  }

  async unMute(volume: number = 0.6) {
    this.isMute = false
    this.sound?.setVolumeAsync(volume)
  }

  // Add other control functions like pause, stop, etc.
  async pause() {
    await this.sound?.pauseAsync()
  }

  async stop() {
    await this.sound?.stopAsync()
  }

  static getInstance() {
    if (instance != null) {
      return instance
    }
    return new AppAudioManager()
  }
}

export default AppAudioManager;