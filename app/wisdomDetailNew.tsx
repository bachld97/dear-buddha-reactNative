import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/Header"

import { BuddhistWisdom } from "@/domain/data/DomainModels"
import { BookmarkRepository } from "@/domain/data/BookmarkRepository"
import { AppEventTracker } from '@/domain/tracking/AppEventTracker';

import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppNavigator } from '@/domain/navigator/AppNavigator';
import ShareableComponent from '@/components/ShreableComponent';
import WisdomCardView from '@/components/ByScreen/WisdomDetail/WisdomCardView';
import WisdomFeedbackView from '@/components/ByScreen/WisdomDetail/WisdomFeedbackView';
import CommonCTAButton from '@/components/CommonCTAButton';
import WisdomCTAGroupView from '@/components/ByScreen/WisdomDetail/WisdomCTAGroupView';

const WisdomDetailNew = () => {
  // Navigation and route hooks
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Init constructor
  const { wisdomInputJSON } = useLocalSearchParams();
  const wisdomInput = wisdomInputJSON != null
    ? JSON.parse(wisdomInputJSON)
    : null;

  // Hooks
  const [tracker] = useState(AppEventTracker.createWisdomTracker())

  const [wisdom] = useState<BuddhistWisdom | null>(wisdomInput);
  const [isSharing, setIsSharing] = useState(false);

  // Event handlers
  const handleBookmark = (wisdom: BuddhistWisdom) => {
    tracker.logBookmark(wisdom)
    BookmarkRepository.bookmarkWisdomV2(wisdom)
  }

  const handleResponse = (wisdom: BuddhistWisdom) => {
    // tracker.logBookmark(wisdom)
    // BookmarkRepository.bookmarkWisdomV2(wisdom)
  }

  const handleShare = (wisdom: BuddhistWisdom) => {
    // tracker.logBookmark(wisdom)
    // BookmarkRepository.bookmarkWisdomV2(wisdom)
    console.log('set share true')
    setIsSharing(true);
  }

  const handleAskAgain = () => {
    tracker.logAskAgain();
    AppNavigator.openMoodInput(router);
  }

  const shareView = (wisdom: BuddhistWisdom) => {
    return <ShareableComponent>
      < WisdomCardView wisdom={wisdom} />
    </ShareableComponent>
  }

  if (isSharing) {
    setTimeout(() => setIsSharing(false), 1000);
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Header title="Hỏi Phật" showBookmark={true} />
      {(isSharing && wisdom != null) && shareView(wisdom)}
      {wisdom != null && <WisdomCardView wisdom={wisdom} />}
      {wisdom != null && <WisdomFeedbackView tracker={tracker} />}
      {wisdom != null && <WisdomCTAGroupView
        onResponse={() => { handleResponse(wisdom) }}
        onBookmark={() => { handleBookmark(wisdom) }}
        onShare={() => { handleShare(wisdom) }}
        onAskAgain={() => { handleAskAgain() }}
      />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})

export default WisdomDetailNew;