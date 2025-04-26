import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from "@/components/Header"
import Footer from "@/components/Footer"

import { BuddhistWisdom } from "@/domain/data/DomainModels"
import { BookmarkRepository } from "@/domain/data/BookmarkRepository"
import { WisdomRepository } from "@/domain/data/WisdomRepository"
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

const WisdomDetail = () => {
    // Navigation and route hooks
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Init constructor
    const { selectedIntentJSON, wisdomInputJSON } = useLocalSearchParams();
    const selectedIntent = selectedIntentJSON != null
        ? JSON.parse(selectedIntentJSON) || WisdomRepository.defaultIntent()
        : WisdomRepository.defaultIntent();

    const wisdomInput = wisdomInputJSON != null
        ? JSON.parse(wisdomInputJSON)
        : null;

    // Hooks
    const [tracker] = useState(AppEventTracker.createWisdomTracker())

    const [wisdom, setWisdom] = useState<BuddhistWisdom | null>(wisdomInput);
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
    const [showBanner, setShowBanner] = useState(false);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (wisdom == null) {
            WisdomRepository.getWisdom(selectedIntent)
                .then((wisdom) => {
                    setWisdom(wisdom)
                    tracker.logShowWisdom(wisdom);
                })
        }
    }, [])

    // Event handlers
    const onFeedback = (value: string, positive: boolean) => {
        setSelectedFeedback(value)
        tracker.logFeedback(value)
    }

    const showNotificationBanner = () => {
        setShowBanner(true);
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowBanner(false);
        });
    };

    const handleBookmark = (wisdom: BuddhistWisdom) => {
        tracker.logBookmark(wisdom)
        showNotificationBanner();
        BookmarkRepository.bookmarkWisdom(
            wisdom,
            selectedIntent
        )
    }


    // UI Components
    const WisdomContent = (wisdom: BuddhistWisdom, intentLabel: string) => {
        return (
            <View>
                <View style={styles.intentTagContainer}>
                    <View style={styles.wisdomIntentTag}>
                        <Text style={styles.wisdomIntentTagText}>
                            {intentLabel}
                        </Text>
                    </View>
                </View>
                <Text style={styles.wisdomContent}>"{wisdom.quote}"</Text>
                <Text style={styles.wisdomAuthor}>— {wisdom.author}</Text>
            </View>
        );
    }

    const WisdomReflection = (wisdom: BuddhistWisdom) => {
        return (
            <View>
                <View style={styles.reflectionContainer}>
                    <Text style={styles.reflectionTitle}>Suy ngẫm:</Text>
                    <Text style={styles.reflectionText}>{wisdom.reflection}</Text>
                </View>
            </View>
        )
    }

    const WisdomFeedback = (
        selectedFeedback: any,
        onFeedback: (value: string, positive: boolean) => void
    ) => {
        return (
            <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackTitle}>
                    Lời dạy này có giúp bạn hôm nay không?
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
                            <Text style={styles.feedbackLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    }

    const CTAButtons = (
        onBookmark: () => void
    ) => {
        return (
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.resetButton}
                    onPress={() => { 
                        tracker.logAskAgain();
                        router.back() 
                    }}
                >
                    <Ionicons name="refresh" size={16} color="#4B5563" />
                    <Text style={styles.resetButtonText}>Hỏi lại</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton}
                    onPress={onBookmark}
                >
                    <Feather name="thumbs-up" size={16} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Lưu lại</Text>
                </TouchableOpacity>
            </View>
        );
    }


    // Render components
    const wisdomContent = wisdom != null ? WisdomContent(
        wisdom, selectedIntent.label
    ) : null
    const wisdomReflection = wisdom != null ? WisdomReflection(wisdom) : null
    const wisdomFeedback = wisdom != null ? WisdomFeedback(selectedFeedback, onFeedback) : null
    const ctaButtons = wisdom != null ? CTAButtons(() => {
        handleBookmark(wisdom);
    }) : null

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
                            AppEventTracker.logEvent(AppEvent.openBookmark,{
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
        <View style={styles.screen}>
            <Header title="Hỏi Phật" showBookmark={true} />

            {showBanner && bannerView(
                'Đã lưu lời Phật dạy',
                'Bạn có thể xem lại trong phần Lời dạy đã lưu'
            )}

            <View style={styles.contentContainer}>
                {wisdom == null
                    ? <ActivityIndicator
                        style={styles.loadingView}
                        size="small" color="#669784"
                    />
                    : <View
                        style={styles.wisdomContainer}
                    >
                        {wisdomContent}
                        {wisdomReflection}
                        {wisdomFeedback}
                        {ctaButtons}
                    </View>
                }
            </View>

            <Footer />
        </View>
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
    },
    loadingView: {
        margin: 64
    },

    wisdomContainer: {
        backgroundColor: "#fefefe",
        borderRadius: 12,
        margin: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 16
    },
    intentTagContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 12
    },
    wisdomIntentTag: {
        backgroundColor: Colors.appGreenLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    wisdomIntentTagText: {
        fontSize: 12,
        color: '#627268',
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
        marginBottom: 24,
    },

    reflectionContainer: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e7eced',
        marginBottom: 24,
    },
    reflectionTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4e5b52',
        marginBottom: 8,
    },
    reflectionText: {
        fontSize: 14,
        color: '#4e6961',
        lineHeight: 20,
    },

    feedbackContainer: {
        marginBottom: 24,
    },
    feedbackTitle: {
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 16,
    },
    feedbackOptions: {
        flexDirection: 'row',
        gap: 16,
        maxWidth: "25%"
    },
    feedbackButton: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    selectedFeedbackButton: {
        backgroundColor: '#F3F4F6',
        transform: [{ scale: 1.1 }],
    },
    feedbackEmoji: {
        fontSize: 24,
        marginBottom: 4,
    },
    feedbackLabel: {
        fontSize: 12,
        color: '#59746e',
        textAlign: 'center'
    },


    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    resetButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e3e3e2',
        backgroundColor: '#fbfcf6',
    },
    resetButtonText: {
        marginLeft: 8,
        color: '#4B5563',
    },

    saveButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 6,
        backgroundColor: '#669784',
    },
    saveButtonText: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 600
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
})

export default WisdomDetail;