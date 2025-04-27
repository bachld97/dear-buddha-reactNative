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

type WisdomCTAProps = {
  onResponse: () => void
  onBookmark: () => void
  onShare: () => void
  onAskAgain: () => void
}

const WisdomCTAGroupView: React.FC<WisdomCTAProps> = props => {

  return (
    <>
      <View style={styles.actionButtons}>
        <CommonCTAButton onPress={props.onResponse}
          apperance={{
            text: 'Phản hồi',
            icon: 'book',
          }} selectedAppearance={null} />

        <CommonCTAButton onPress={props.onBookmark}
          apperance={{
            text: 'Lưu lại',
            icon: 'bookmark',
          }} selectedAppearance={null} />

        <CommonCTAButton onPress={props.onShare}
          apperance={{
            text: 'Chia sẻ',
            icon: 'share',
          }} selectedAppearance={null} />

      </View >

      <TouchableOpacity style={styles.askAgainButton}
        onPress={props.onAskAgain}
      >
        <Feather name="chevron-left" size={16} color={Colors.icon} />
        <Text style={styles.askAgainButtonText}>Hỏi lại</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
  askAgainButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  askAgainButtonText: {
    marginLeft: 6,
    color: '#4B5563',
    fontSize: 13,
    fontWeight: 400
  }
})

export default WisdomCTAGroupView;