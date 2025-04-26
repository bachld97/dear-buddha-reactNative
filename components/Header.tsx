import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  SafeAreaView
} from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors';
import { AppNavigator } from "@/domain/navigator/AppNavigator"
import { useRouter } from 'expo-router';
import { AppEventTracker, AppEvent } from '@/domain/tracking/AppEventTracker';

interface HeaderProps {
  title?: string;
  showBookmark?: boolean;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Hỏi Phật',
  showBookmark = true,
  showBack = false
}) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={16} color={Colors.icon} />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {showBookmark && (
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => {
              AppEventTracker.logEvent(AppEvent.openBookmark, {
                source: "header"
              });
              AppNavigator.openBookmark(router)
            }}
          >
            <Ionicons name="bookmark" size={16} color={Colors.icon} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textTitle,
  },
  bookmarkButton: {
    paddingRight: 8,
    paddingBottom: 4
  },
});

export default Header; 