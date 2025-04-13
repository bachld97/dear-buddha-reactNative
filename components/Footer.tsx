import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    SafeAreaView,
    useSafeAreaInsets
  } from 'react-native-safe-area-context'

const Footer = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.bottomTextContainer, { bottom: insets.bottom }]}>
            <Text style={styles.bottomText}>Mỗi ngày một lời Phật dạy</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomTextContainer: {
        padding: 16,
        backgroundColor: '#f0f6ef',
        position: 'absolute',
        width: '100%',
    },
    bottomText: {
        textAlign: 'center',
        color: '#56695d',
        fontSize: 13,
        fontWeight: 500
    },
})

export default Footer; 