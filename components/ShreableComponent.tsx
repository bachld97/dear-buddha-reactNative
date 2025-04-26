import { useState, useRef, useLayoutEffect } from 'react';
import { captureRef } from 'react-native-view-shot';
import {
    View,
    StyleSheet,
    Text,
    Image
  } from "react-native";

import type { PropsWithChildren } from 'react';
import Share from "react-native-share";
import { Colors } from '@/constants/Colors';

type ShareableComponentProp = PropsWithChildren;

const ShareableComponent: React.FC<ShareableComponentProp> = props => {
    console.log('shareable')

    const imageRef = useRef<View>(null);

    const captureThenShare = async () => {
        try {
            const url = await captureRef(imageRef, {
                quality: 0.8,
            });

            const shareOptions = {
                title: "Share image",
                url: url,
                failOnCancel: false,
            }
            Share.open(shareOptions);
        } catch (e) {
            console.debug(e);
        }
    }


    useLayoutEffect(() => {
        setTimeout(
            () => captureThenShare(),
            300
        )
    }, [])

    const appIcon = require('@/assets/adaptive-icon2.png')

    return (
        <View ref={imageRef} collapsable={false} style={styles.container}>
            <View style={styles.watermark}>
                <Text style={styles.watermarkText}>Hỏi Phật</Text>
                {/* <Image source={appIcon} width={32} height={32}/> */}
            </View>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 360,
        height: 640,

        position: "absolute",
        left: -9999,
    },

    watermark: {
        // zIndex: 1000,
        // position: "absolute",
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: Colors.background,
    },

    watermarkText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textTitle,
    }

});

export default ShareableComponent;