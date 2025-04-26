import React, {useEffect} from 'react';
import {Animated, Text, View, useAnimatedValue} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{
  style: ViewStyle,
  yPosStart: number,
  yPosEnd: number,
  animDuraion: number
}>;

export const EntranceAnimatorWrap: React.FC<FadeInViewProps> = props => {
  const slideUp = useAnimatedValue(props.yPosStart);
  const fadeIn = useAnimatedValue(0);
  const duration = props.animDuraion;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1200),
      Animated.parallel([
        Animated.timing(slideUp, {
          toValue: props.yPosEnd,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeIn, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
      ])
    ]).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{ translateY: slideUp }],
        opacity: fadeIn, 
      }}>
      {props.children}
    </Animated.View>
  );
};