import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ImageBackground
} from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/Header"

import { BuddhistWisdom } from "@/domain/data/DomainModels"
import { BookmarkRepository } from "@/domain/data/BookmarkRepository"
import { AppEventTracker, AppEvent } from '@/domain/tracking/AppEventTracker';

import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppNavigator } from '@/domain/navigator/AppNavigator';

const FEEDBACK_OPTIONS = [
  { emoji: "🙏", label: "Rất giúp ích", value: "very_helpful", positive: true },
  { emoji: "😊", label: "Dễ chịu", value: "pleasant", positive: true },
  { emoji: "😐", label: "Bình thường", value: "neutral", positive: false },
  { emoji: "😕", label: "Chưa phù hợp", value: "not_helpful", positive: false },
];

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

  const [wisdom, setWisdom] = useState<BuddhistWisdom | null>(wisdomInput);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const authorImage = {
    uri: wisdom != null && wisdom.author.portraitUrl
  };


  // Event handlers
  const onFeedback = (value: string, positive: boolean) => {
    console.debug(value)
    setSelectedFeedback(value)
    tracker.logFeedback(value)
  }

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
  }

  const handleAskAgain = () => {
    tracker.logAskAgain();
    AppNavigator.openMoodInput(router);
  }

  
  // UI Components
  const WisdomContent = (wisdom: BuddhistWisdom) => {
    return (
      <View>
        <Text style={styles.wisdomContent}>"{wisdom.quote}"</Text>
        <Text style={styles.wisdomAuthor}>— {wisdom.author.fullName}</Text>
      </View>
    );
  }

  const WisdomFeedback = (
    selectedFeedback: any,
    onFeedback: (value: string, positive: boolean) => void
  ) => {
    return (
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTitle}>
          Con cảm thấy thế nào sau khi nghe điều này?
        </Text>
        <View style={styles.feedbackOptions}>
          {FEEDBACK_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.feedbackButton,
                selectedFeedback === option.value && styles.selectedFeedbackButton
              ]}
              onPress={() => onFeedback(option.value, option.positive)}
            >
              <Text style={styles.feedbackEmoji}>{option.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  const CTAButtons = (
    onBookmark: () => void,
    onShare: () => void,
    onResponse: () => void,
    onAskAgain: () => void
  ) => {
    return (
      <>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.ctaSingleButton}
            onPress={onResponse}
          >
          <Ionicons name="refresh" size={20} color={Colors.icon} />
          <Text style={styles.ctaSingleButtonText}>Phản hồi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctaSingleButton}
          onPress={onBookmark}
        >
          <Feather name="bookmark" size={20} color={Colors.icon} />
          <Text style={styles.ctaSingleButtonText}>Lưu lại</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ctaSingleButton}
          onPress={onShare}
        >
          <Feather name="share" size={20} color={Colors.icon} />
          <Text style={styles.ctaSingleButtonText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>


        <TouchableOpacity style={styles.askAgainButton}
          onPress={onAskAgain}
        >
          <Feather name="chevron-left" size={16} color={Colors.icon} />
          <Text style={styles.askAgainButtonText}>Hỏi lại</Text>
        </TouchableOpacity>
      </>
    );
  }


  // Render components
  const wisdomContent = wisdom != null ? WisdomContent(wisdom) : null
  const wisdomFeedback = wisdom != null ? WisdomFeedback(selectedFeedback, onFeedback) : null
  const ctaButtons = wisdom != null ? CTAButtons(
    () => { handleBookmark(wisdom) },
    () => { handleShare(wisdom) },
    () => { handleResponse(wisdom) },
    () => { handleAskAgain() }
  ) : null

  const bannerView = (title: string, subtitle: string) => {
    return (
      <Animated.View style={[styles.banner, {
        opacity: fadeAnim,
        top: insets.top
      }]}>
        <View style={styles.bannerContent}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>{title}</Text>
            <Text style={styles.bannerSubtitle}>{subtitle}</Text>
          </View>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => {
              AppEventTracker.logEvent(AppEvent.openBookmark, {
                source: "banner"
              });
              setShowBanner(false);
              AppNavigator.openBookmark(router);
            }}
          >
            <Text style={styles.bannerButtonText}>Xem ngay</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>

      <Header title="Hỏi Phật" showBookmark={true} />

      {showBanner && bannerView(
        'Đã lưu lời Phật dạy',
        'Bạn có thể xem lại trong phần Lời dạy đã lưu'
      )}

      <ImageBackground source={authorImage}
        resizeMode="cover"
        transition={10000}
        style={styles.backgroundImage}>

        <View style={styles.contentContainer}>
          {wisdom == null
            ? <ActivityIndicator
              style={styles.loadingView}
              size="small" color="#669784"
            />
            : <View style={styles.wisdomContainer}>
              {wisdomContent}
            </View>
          }
        </View>

      </ImageBackground>

      {wisdomFeedback}
      {ctaButtons}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    // alignItems: 'center'
  },
  loadingView: {
    margin: 64
  },

  wisdomContainer: {
    backgroundColor: "#fefefee0",
    borderRadius: 12,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },

  wisdomContent: {
    fontSize: 20,
    lineHeight: 28,
    color: '#495555',
    marginBottom: 16,
    fontFamily: 'serif',
  },
  wisdomAuthor: {
    fontSize: 14,
    color: '#56695d',
    fontStyle: 'italic',
    textAlign: 'right',
  },

  feedbackContainer: {
    paddingTop: 20,
  },
  feedbackTitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  feedbackOptions: {
    flexDirection: 'row',
    gap: 16,
    // maxWidth: "25%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 16
  },
  feedbackButton: {
    padding: 8,
    borderRadius: 16,
  },
  selectedFeedbackButton: {
    backgroundColor: "#669784",
  },
  feedbackEmoji: {
    fontSize: 24,
  },


  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingLeft: 20,
    paddingRight: 20
  },
  ctaSingleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e3e3e2',
    backgroundColor: '#fbfcf6',
    gap: 8
  },
  ctaSingleButtonText: {
    color: '#4B5563',
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
  },
  banner: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: '#669784',
    borderRadius: 12,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  bannerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  bannerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default WisdomDetailNew;