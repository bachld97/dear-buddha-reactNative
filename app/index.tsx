import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Header from "@/components/Header"
import { useState, useEffect } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';
import Footer from "@/components/Footer";

const INTENTS = [
  { value: "calm", label: "Bình yên", emoji: "😌" },
  { value: "insight", label: "Hiểu biết", emoji: "💡" },
  { value: "gratitude", label: "Biết ơn", emoji: "🙏" },
  { value: "confusion", label: "Hoang mang", emoji: "😕" },
];


export default function Index() {

  const navigation = useNavigation()

  const [selectedIntent, setSelectedIntent] = useState(INTENTS[0]);

  const [isAsking, setIsAsking] = useState(false);

  // Action handler
  const handleAskBuddha = () => {
    navigation.navigate('wisdomDetail', {
      selectedIntent: selectedIntent,
      selectedIntentLabel: selectedIntent.label
    });
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

      <View style={styles.intentGrid}>
        {INTENTS.map(intent => (
          <TouchableOpacity
            key={intent.value}
            style={[
              styles.intentButton,
              selectedIntent.value === intent.value && styles.selectedIntentButton
            ]}
            onPress={() => setSelectedIntent(intent)}
          >
            <Text style={styles.intentEmoji}>{intent.emoji}</Text>
            <Text style={[
              styles.intentLabel,
              selectedIntent.value === intent.value && styles.selectedIntentLabel
            ]}>
              {intent.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.askButton, isAsking && styles.askButtonDisabled]}
        onPress={handleAskBuddha}
        disabled={isAsking}
      >
        {isAsking ? (
          <View style={styles.askingContainer}>
            <Text style={styles.askingText}>🪷</Text>
            <Text style={styles.askButtonText}>Đang hỏi...</Text>
          </View>
        ) : (
          <View style={styles.askButtonContainer}>
            <Text style={styles.askButtonText}>Hỏi Phật</Text>
            <Feather name="chevron-right" size={16} color="#FFFFFF" />
          </View>
        )}
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
    backgroundColor: '#9CA3AF',
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
