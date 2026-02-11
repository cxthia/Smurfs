import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Animated } from 'react-native';

export const EMOTIONS = [
  'anxious',
  'calm',
  'confused',
  'devious',
  'ecstatic',
  'happy',
  'hungry',
  'lonely',
  'mad',
  'motivated',
  'sad',
  'scared',
] as const;

export type EmotionType = typeof EMOTIONS[number];

const emotionSprites: Record<EmotionType, any> = {
  anxious: require('../assets/anxious.png'),
  calm: require('../assets/calm.png'),
  confused: require('../assets/confused.png'),
  devious: require('../assets/devious.png'),
  ecstatic: require('../assets/ecstatic.png'),
  happy: require('../assets/happy.png'),
  hungry: require('../assets/hungry.png'),
  lonely: require('../assets/lonely.png'),
  mad: require('../assets/mad.png'),
  motivated: require('../assets/motivated.png'),
  sad: require('../assets/sad.png'),
  scared: require('../assets/scared.png'),
};

type Props = {
  emotion: EmotionType;
};

export default function AvatarSprite({ emotion }: Props) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation;

    switch (emotion) {
      case 'calm':
        animation = slowFloat();
        break;
      case 'anxious':
      case 'scared':
        animation = jitter();
        break;
      case 'sad':
      case 'lonely':
        animation = heavyDrift();
        break;
      case 'ecstatic':
      case 'happy':
        animation = bounce();
        break;
      case 'mad':
        animation = sharpPulse();
        break;
      case 'motivated':
        animation = confidentRise();
        break;
      case 'confused':
        animation = wobble();
        break;
      case 'devious':
        animation = sneakySlide();
        break;
      case 'hungry':
        animation = slowNudge();
        break;
      default:
        animation = slowFloat();
    }

    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY: anim }] }}>
      <Image source={emotionSprites[emotion]} style={styles.avatar} />
    </Animated.View>
  );
}

/* ─── Motion helpers ─── */

const slowFloat = () =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(new Animated.Value(0), {
        toValue: -6,
        duration: 3000,
        useNativeDriver: true,
      }),
    ])
  );

const jitter = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: 4,
      duration: 150,
      useNativeDriver: true,
    })
  );

const bounce = () =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(new Animated.Value(0), {
        toValue: -10,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(new Animated.Value(0), {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ])
  );

const heavyDrift = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: 8,
      duration: 4000,
      useNativeDriver: true,
    })
  );

const sharpPulse = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: -3,
      duration: 300,
      useNativeDriver: true,
    })
  );

const confidentRise = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: -8,
      duration: 2000,
      useNativeDriver: true,
    })
  );

const wobble = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: 5,
      duration: 1200,
      useNativeDriver: true,
    })
  );

const sneakySlide = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: -4,
      duration: 1800,
      useNativeDriver: true,
    })
  );

const slowNudge = () =>
  Animated.loop(
    Animated.timing(new Animated.Value(0), {
      toValue: 3,
      duration: 3500,
      useNativeDriver: true,
    })
  );

const styles = StyleSheet.create({
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginVertical: 8,
  },
});



