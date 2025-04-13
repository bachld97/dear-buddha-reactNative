import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    SafeAreaView
  } from 'react-native-safe-area-context'

const Footer = () => {
    return (
        <SafeAreaView edges={['bottom']}>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>Mỗi ngày một lời Phật dạy</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomTextContainer: {
        padding: 16,
        backgroundColor: '#f0f6ef'
    },
    bottomText: {
        textAlign: 'center',
        color: '#56695d',
        fontSize: 13,
        fontWeight: 500
    },
})

export default Footer; 