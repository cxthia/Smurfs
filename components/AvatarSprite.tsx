// components/AvatarSprite.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const emotionSprites = {
  anxious: require('../assets/anxious.png'),
  tired: require('../assets/tired.png'),
  calm: require('../assets/calm.png'),
  confused: require('../assets/confused.png'),
  devious: require('../assets/devious.png'),
  ecstatic: require('../assets/ecstatic.png'),
  happy: require('../assets/happy.png'),
  hungry: require('../assets/hungry.jpg'),
  lonely: require('../assets/lonely.png'),
  mad: require('../assets/mad.png'),
  motivated: require('../assets/motivated.jpg'),
  sad: require('../assets/sad.png'),
  scared: require('../assets/scared.png'),
};

export type EmotionType = keyof typeof emotionSprites;

type AvatarProps = {
  emotion: EmotionType;
};

export default function AvatarSprite({ emotion }: AvatarProps) {
  return (
    <View style={styles.container}>
      <Image source={emotionSprites[emotion]} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});


