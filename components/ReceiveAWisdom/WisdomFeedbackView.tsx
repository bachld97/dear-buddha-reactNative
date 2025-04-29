import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
    AppEventTracker,
    WisdomDetailTracker
} from '@/domain/tracking/AppEventTracker';
import { Colors } from '@/constants/Colors';

const FEEDBACK_OPTIONS = [
  { emoji: "🙏", label: "Rất giúp ích", value: "very_helpful", positive: true },
  { emoji: "😊", label: "Dễ chịu", value: "pleasant", positive: true },
  { emoji: "😐", label: "Bình thường", value: "neutral", positive: false },
  { emoji: "😕", label: "Chưa phù hợp", value: "not_helpful", positive: false },
];

type WisdomFeedbackViewProps = {
    isCompact: boolean
    tracker: WisdomDetailTracker | null
}

export const WisdomFeedbackView: React.FC<WisdomFeedbackViewProps> = props => {
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

    const tracker = props.tracker;

    const onFeedback = (value: string, positive: boolean) => {
        setSelectedFeedback(value)
        tracker?.logFeedback(value)
    }

    return (
        <View style={styles.feedbackContainer}>
            <Text style={[
                styles.feedbackTitle, props.isCompact && styles.feedbackTitleCompact
            ]}>
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

const styles = StyleSheet.create({
    feedbackContainer: {
        paddingTop: 20,
    },
    feedbackTitle: {
        fontSize: 16,
        color: Colors.icon,
        textAlign: 'center',
    },
    feedbackTitleCompact: {
        fontSize: 15,
        textAlign: 'left',
    },
    feedbackOptions: {
        flexDirection: 'row',
        gap: 16,
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
        backgroundColor: Colors.appGreen
    },
    feedbackEmoji: {
        fontSize: 24,
    },
})

export default WisdomFeedbackView;