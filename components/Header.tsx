import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView
} from 'react-native-safe-area-context'

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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={16} color="#4B5563" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {showBookmark && (
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => navigation.navigate('wisdomBookmark')}
          >
            <Ionicons name="bookmark" size={16} color="#4B5563" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f0f6ef',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f6ef',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  bookmarkButton: {
    padding: 8,
  },
});

export default Header; 