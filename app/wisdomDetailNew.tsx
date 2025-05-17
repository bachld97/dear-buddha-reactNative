import React, { useLayoutEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/Header"

import { BuddhistWisdom } from "@/domain/data/DomainModels"
import { BookmarkRepository } from "@/domain/data/BookmarkRepository"
import { AppEventTracker, AppEvent } from '@/domain/tracking/AppEventTracker';

import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppNavigator } from '@/domain/navigator/AppNavigator';
import ShareableComponent from '@/components/ShreableComponent';

import WisdomCardView from '@/components/ReceiveAWisdom/WisdomCardView';
import WisdomFeedbackView from '@/components/ReceiveAWisdom/WisdomFeedbackView';
import WisdomCTAGroupView from '@/components/ReceiveAWisdom/WisdomCTAGroupView';

import { MyStyle } from '@/constants/Styles';

import BannerView from '@/components/BannerView';
import WisdomRespondingContentView from '@/components/RespondToAWisdom/WisdomRespondingContentView';

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

  // Respond
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [isShareEnabled, toggleShareEnabled] = useState(false);
  const [responseText, onChangeResponseText] = useState('');

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
    setIsResponding(!isResponding)
  }

  const handleAddAction = (wisdom: BuddhistWisdom) => {

  }

  const handleShare = (wisdom: BuddhistWisdom) => {
    tracker.logShare(wisdom)
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
      <KeyboardAwareScrollView 
        enabled={true}
        disableScrollOnKeyboardHide={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <WisdomCardView wisdom={wisdom} />

        <WisdomFeedbackView
          isCompact={false}
          tracker={tracker} />

        <WisdomCTAGroupView
          isResponding={isResponding}
          onAddAction={() => handleAddAction(wisdom)}
          onResponse={() => { handleResponse(wisdom) }}
          onBookmark={() => { handleBookmark(wisdom) }}
          onShare={() => { handleShare(wisdom) }}
        />

        {isResponding &&
          <View style={MyStyle.screenContainer}>
            <WisdomRespondingContentView
              isCompact={false}
              isTextInputFocused={isTextInputFocused}
              setIsTextInputFocused={setIsTextInputFocused}
              responseText={responseText}
              onChangeResponseText={onChangeResponseText}
              isShareEnabled={isShareEnabled}
              toggleShareEnabled={toggleShareEnabled}
            />
          </View>
        }

      </KeyboardAwareScrollView>

      <TouchableOpacity style={styles.askAgainButton}
        onPress={handleAskAgain}
      >
        <Feather name="chevron-left" size={16} color={Colors.icon} />
        <Text style={styles.askAgainButtonText}>Hỏi lại</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  askAgainButton: {
    paddingTop: 20,
    paddingBottom: 12,
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

export default WisdomDetailNew;