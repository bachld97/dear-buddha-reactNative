import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BannerViewProps = {
  title: string
  subtitle: string
  onPress: () => void
  onTimeout: () => void
}

const BannerView: React.FC<BannerViewProps> = (props) => {
  const title = props.title
  const subtitle = props.subtitle
  const onPress = props.onPress

  const insets = useSafeAreaInsets();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
    ]).start(props.onTimeout);
  }, [])

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
          onPress={onPress}
        >
          <Text style={styles.bannerButtonText}>Xem ngay</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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

export default BannerView;
