import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Image
} from "react-native";
import Header from "@/components/Header"
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';
import Footer from "@/components/Footer";

import { AppEventTracker, AppEvent } from "@/domain/tracking/AppEventTracker";
import { WisdomRepository } from "@/domain/data/WisdomRepository";
import { Intent } from "@/domain/data/DomainModels"
import { AppNavigator } from "@/domain/navigator/AppNavigator";


export default function MoodInput() {
    const [listIntents, setListIntents] = useState<[Intent] | null>(null);
    const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (listIntents == null) {
            WisdomRepository.getIntents()
                .then((intents) => setListIntents(intents));
        }
    })

    const router = useRouter();

    const createIntentsGrid = (intents: [Intent] | null): any => {

        const handleSelectIntent = (intent: Intent) => {
            setSelectedIntent(intent)
            AppEventTracker.logEvent(AppEvent.selectIntent, {
                intentType: intent.intentType
            })
        };

        const isIntentSelected = (intent: Intent): boolean => {
            if (selectedIntent == null) {
                return false;
            }
            return selectedIntent.intentType === intent.intentType;
        }

        if (listIntents == null) {
            return <ActivityIndicator
                style={styles.loadingView}
                size="small" color="#669784"
            />
        } else {
            return (
                <View style={styles.intentGrid}>
                    {intents.map(intent => (
                        <TouchableOpacity
                            key={intent.intentType}
                            style={[
                                styles.intentButton,
                                isIntentSelected(intent) && styles.selectedIntentButton
                            ]}
                            onPress={() => handleSelectIntent(intent)}
                        >
                            <Text style={styles.intentEmoji}>{intent.emoji}</Text>
                            <Text style={[
                                styles.intentLabel,
                                isIntentSelected(intent) && styles.selectedIntentLabel
                            ]}>
                                {intent.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }
    }

    // Action handler
    const handleAskBuddha = () => {
        const fetchAndPreloadWisdom = async () => {
            const wisdom = await WisdomRepository.getWisdom(selectedIntent)
            if (wisdom.author.portraitUrl !== '') {
                console.debug(wisdom.author.portraitUrl)
                await Image.prefetch(wisdom.author.portraitUrl)
                    .catch(error => {
                        console.error(error);
                    });
            }
            AppNavigator.openWisdomScreenByWisdom(router, wisdom);
        }

        AppEventTracker.logEvent(AppEvent.createWisdom, {
            intentType: selectedIntent?.intentType || "none"
        });
        setIsLoading(true);
        fetchAndPreloadWisdom()
    };

    return (
        <View
            style={styles.screen}
        >
            <Header title="Hỏi Phật" showBookmark={true} />

            <View style={styles.intentSection}>
                <Text style={styles.intentTitle}>
                    Điều gì đang ở trong tâm trí bạn?
                </Text>
                <Text style={styles.intentSubtitle}>
                    Chọn ý định để nhận lời dạy phù hợp
                </Text>
            </View>

            {createIntentsGrid(listIntents)}

            <TouchableOpacity
                style={[
                    styles.askButton,
                    isLoading && styles.askButtonDisabled
                ]}
                onPress={handleAskBuddha}
                disabled={isLoading}
            >
                <View style={styles.askButtonContainer}>
                    <Text style={styles.askButtonText}>Hỏi Phật</Text>
                    { isLoading ? 
                        <ActivityIndicator size="small" color="#FFFFFF" /> :
                        <Feather name="chevron-right" size={16} color="#FFFFFF" />
                    }
                </View>
            </TouchableOpacity>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f0f6ef"
    },
    loadingView: {
        margin: 64
    },
    intentSection: {
        alignItems: 'center',
        marginVertical: 32,
    },
    intentTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    intentSubtitle: {
        fontSize: 16,
        color: '#4B5563',
        textAlign: 'center',
    },
    intentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    intentButton: {
        width: '48%',
        height: 96,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#d3dad3',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: '#fbfcf6',
    },
    selectedIntentButton: {
        backgroundColor: Colors.appGreen,
        borderColor: Colors.appGreen,
    },
    intentEmoji: {
        fontSize: 24,
        marginBottom: 8,
    },
    intentLabel: {
        fontSize: 16,
        color: '#4B5563',
    },
    selectedIntentLabel: {
        color: '#FAFAFA',
    },
    askButton: {
        margin: 16,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#669784',
        alignItems: 'center',
    },
    askButtonDisabled: {
        backgroundColor: Colors.ctaBackgroundDisabled,
    },
    askingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    askingText: {
        fontSize: 20,
        marginRight: 8,
    },
    askButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    askButtonText: {
        color: '#FAFAFA',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8
    },
});
