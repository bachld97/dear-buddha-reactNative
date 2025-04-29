import { BuddhistWisdom } from '@/domain/data/DomainModels';
import {
    Text, View, StyleSheet, ImageBackground
} from 'react-native';

type WisdomCardViewProps = {
    wisdom: BuddhistWisdom
}

export const WisdomCardView: React.FC<WisdomCardViewProps> = props => {
    const wisdom = props.wisdom

    const authorImage = {
        uri: wisdom.author.portraitUrl
    }

    return (
        <ImageBackground source={authorImage}
            resizeMode="cover"
            style={styles.backgroundImage}>

            <View style={styles.contentContainer}>
                <View style={styles.wisdomContainer}>
                    <Text style={styles.wisdomContent}>"{wisdom.quote}"</Text>
                    <Text style={styles.wisdomAuthor}>— {wisdom.author.fullName}</Text>
                </View>
            </View>

        </ImageBackground>
    );
}

export default WisdomCardView;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    wisdomContainer: {
        backgroundColor: "#fefefee0",
        borderRadius: 12,
        margin: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 16,
    },
    wisdomContent: {
        fontSize: 20,
        lineHeight: 28,
        color: '#495555',
        marginBottom: 16,
        fontFamily: 'serif',
    },
    wisdomAuthor: {
        fontSize: 14,
        color: '#56695d',
        fontStyle: 'italic',
        textAlign: 'right',
    },
})