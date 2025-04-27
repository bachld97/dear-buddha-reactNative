
import {
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';

type ButtonAppearance = {
    text: string
    icon: keyof typeof Feather.glyphMap,
}

type CommonCTAButtonProps = {
    onPress: () => void
    apperance: ButtonAppearance,
    selectedAppearance: ButtonAppearance | null
}

export const CommonCTAButton: React.FC<CommonCTAButtonProps> = props => {
    const onPress = props.onPress
    // const style = (function () {
    //     switch (normal) {
    //       case ButtonType.Primary:
    //             return styles.ctaSingleButton;
    //         case ButtonType.Primary:
    //             return styles.ctaSingleButton;
    //     }
    //   })();

    const state = props.apperance

    return (
        <TouchableOpacity
            style={styles.ctaSingleButton}
            onPress={onPress}
        >
            <Feather name={state.icon} size={20}
                color={Colors.icon} />

            <Text style={styles.ctaSingleButtonText}>
                {state.text}
            </Text>

        </TouchableOpacity>
    )
}

export default CommonCTAButton;

const styles = StyleSheet.create({
    ctaSingleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e3e3e2',
        backgroundColor: '#fbfcf6',
        gap: 8
    },
    ctaSingleButtonText: {
        color: Colors.icon
    },
})