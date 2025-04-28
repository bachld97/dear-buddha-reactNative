import CommonCTAButton from '@/components/CommonCTAButton';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes';

type WisdomCTAProps = {
  isResponding: boolean
  onResponse: () => void

  onBookmark: () => void
  onShare: () => void
  onAskAgain: () => void
}

const WisdomCTAGroupView: React.FC<WisdomCTAProps> = props => {

  return (
    <View style={styles.actionButtons}>
      <CommonCTAButton onPress={props.onResponse}
        isSelected={props.isResponding}
        apperance={{
          text: 'Phản hồi',
          icon: 'book',
        }} selectedAppearance={null} />

      <CommonCTAButton onPress={props.onBookmark}
        isSelected={false}
        apperance={{
          text: 'Lưu lại',
          icon: 'bookmark',
        }} selectedAppearance={null} />

      <CommonCTAButton onPress={props.onShare}
        isSelected={false}
        apperance={{
          text: 'Chia sẻ',
          icon: 'share',
        }} selectedAppearance={null} />

    </View >
  )
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
 
})

export default WisdomCTAGroupView;