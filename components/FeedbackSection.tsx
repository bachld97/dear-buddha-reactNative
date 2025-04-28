import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { AppEvent, AppEventTracker } from '@/domain/tracking/AppEventTracker';

export const FeedbackSection = () => {
  const handlePress = () => {
    AppEventTracker.logEvent(AppEvent.feedbackCTA);
    Linking.openURL('https://m.me/j/AbbtegYf3SbXf4k2/');
  };

  return (
      <TouchableOpacity 
        style={styles.button}
        onPress={handlePress}
      >
        <Feather name="message-circle" size={16} color={Colors.icon} style={styles.icon} />
        <Text style={styles.buttonText}>Đóng góp ý kiến</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.appGreenLight,
    backgroundColor: Colors.appGreenLight,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: Colors.text,
    fontSize: 14,
  },
}); 