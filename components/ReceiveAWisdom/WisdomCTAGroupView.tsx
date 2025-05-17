import CommonCTAButton from '@/components/CommonCTAButton';
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

type WisdomCTAProps = {
  isResponding: boolean
  onResponse: () => void
  onAddAction: () => void
  onBookmark: () => void
  onShare: () => void
}

const WisdomCTAGroupView: React.FC<WisdomCTAProps> = props => {

  return (
    <View style={styles.actionButtons}>
      {/* <CommonCTAButton onPress={props.onResponse}
        isSelected={props.isResponding}
        apperance={{
          text: 'Phản hồi',
          icon: 'book',
        }} selectedAppearance={null} />

      <CommonCTAButton onPress={props.onAddAction}
        isSelected={false}
        apperance={{
          text: 'Hành động',
          icon: 'check-square',
        }} selectedAppearance={null} /> */}

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