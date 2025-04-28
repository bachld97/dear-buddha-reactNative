import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/Header"

import { BuddhistWisdom } from "@/domain/data/DomainModels"
import { BookmarkRepository } from "@/domain/data/BookmarkRepository"
import { AppEventTracker, AppEvent } from '@/domain/tracking/AppEventTracker';

import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppNavigator } from '@/domain/navigator/AppNavigator';
import ShareableComponent from '@/components/ShreableComponent';
import WisdomCardView from '@/components/ByScreen/WisdomDetail/WisdomCardView';
import WisdomFeedbackView from '@/components/ByScreen/WisdomDetail/WisdomFeedbackView';
import BannerView from '@/components/BannerView';
import WisdomCTAGroupView from '@/components/ByScreen/WisdomDetail/WisdomCTAGroupView';
import WisdomRespondingView from '@/components/ByScreen/WisdomDetail/WisdomRespondingView';

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

  // Transient state check
  const [isSharing, setIsSharing] = useState(false);
  const [showBookmarkBanner, setShowBookmarkBanner] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  // Event handlers
  const handleBookmark = (wisdom: BuddhistWisdom) => {
    tracker.logBookmark(wisdom)
    BookmarkRepository.bookmarkWisdomV2(wisdom)
    setShowBookmarkBanner(true)
  }

  const handleResponse = (wisdom: BuddhistWisdom) => {
    // setIsResponding(true)
    AppNavigator.openWisdomResponseStandalone(router)
  }

  const handleShare = (wisdom: BuddhistWisdom) => {
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

  if (wisdom == null) {
    return <View></View>
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <Header title="Hỏi Phật" showBookmark={true} />

      {/* Transitent views */}
      {(isSharing) && shareView(wisdom)}

      {(showBookmarkBanner) &&
        <BannerView
          title='Đã lưu lời Phật dạy'
          subtitle='Con có thể xem lại trong phần Lời dạy đã lưu'
          onPress={() => {
            AppEventTracker.logEvent(AppEvent.openBookmark, {
              source: "banner"
            });
            setShowBookmarkBanner(false);
            AppNavigator.openBookmark(router)
          }}
          onTimeout={() => {
            setShowBookmarkBanner(false);
          }}
        />
      }

      {/* Fixed views */}
      <WisdomCardView wisdom={wisdom} />
      <WisdomFeedbackView
        isCompact={false}
        tracker={tracker} />

      <WisdomRespondingView
        isVisible={isResponding}
        requestClose={() => {
          setIsResponding(false);
        }}/>

      <WisdomCTAGroupView
        onResponse={() => { handleResponse(wisdom) }}
        onBookmark={() => { handleBookmark(wisdom) }}
        onShare={() => { handleShare(wisdom) }}
        onAskAgain={() => { handleAskAgain() }}
      />

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