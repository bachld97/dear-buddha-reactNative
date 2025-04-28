import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Switch
} from 'react-native';
import { useState } from 'react';
import { Keyboard } from 'react-native';

import { Colors } from '@/constants/Colors';

type WisdomRespondingContentViewProps = {
  isCompact: boolean

  isTextInputFocused: boolean
  setIsTextInputFocused: (isFocus: boolean) => void,

  responseText: string,
  onChangeResponseText: (txt: string) => void,

  isShareEnabled: boolean
  toggleShareEnabled: (isShare: boolean) => void
}

const WisdomRespondingContentView: React.FC<WisdomRespondingContentViewProps> = props => {
  const isTextInputFocused = props.isTextInputFocused
  const setIsTextInputFocused = props.setIsTextInputFocused

  const responseText = props.responseText
  const onChangeResponseText = props.onChangeResponseText

  const isShareEnabled = props.isShareEnabled
  const toggleShareEnabled = props.toggleShareEnabled
  
  const isSubmitDisabled = responseText.length === 0

  return <>
    <TextInput
      editable
      multiline
      style={[
        styles.input,
        isTextInputFocused && styles.inputFocused
      ]}
      maxLength={props.isCompact ? 300 : 1200}
      onChangeText={onChangeResponseText}
      onFocus={() => setIsTextInputFocused(true)}
      onBlur={() => setIsTextInputFocused(false)}
      value={responseText}
      placeholder={'Chia sẻ cảm nghĩ của con...'}
    />

    <View style={styles.onOffShare}>
      <Text style={styles.shareText}>
        Chia sẻ cảm nhận với bạn bè
      </Text>

      <Switch
        style={styles.shareSwitch}
        trackColor={{
          false: Colors.ctaBackgroundDisabled,
          true: Colors.appGreen
        }}
        thumbColor={'#f4f3f4'}
        ios_backgroundColor={Colors.background}
        onValueChange={toggleShareEnabled}
        value={isShareEnabled}
      />
    </View>

    <TouchableOpacity
      style={[
        styles.submitButton,
        isSubmitDisabled && styles.submitButtonDisabled
      ]}
      onPress={() => {

      }}
      disabled={isSubmitDisabled}
    >
      <View style={styles.submitButtonContainer}>
        <Text style={styles.submitButtonText}>Gửi cảm nhận</Text>
      </View>
    </TouchableOpacity>
  </>
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    minHeight: 148,
    backgroundColor: Colors.appGreenLight,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e7eced',
    marginBottom: 8,
    color: Colors.textTitle,
    fontSize: 16
  },
  inputFocused: {
    borderColor: Colors.appGreen,
    borderWidth: 2
  },

  onOffShare: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 8
  },
  shareText: {
    fontSize: 14,
    color: Colors.textSecondary
  },
  shareSwitch: {
    marginLeft: 'auto',
    transform: [{ scaleX: .75 }, { scaleY: .75 }]
  },

  submitButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#669784',
    alignItems: 'center',
    width: '100%'
  },
  submitButtonDisabled: {
    backgroundColor: Colors.ctaBackgroundDisabled,
  },
  submitButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.textOnColor,
    fontSize: 15,
    fontWeight: '500',
  },
})

export default WisdomRespondingContentView;