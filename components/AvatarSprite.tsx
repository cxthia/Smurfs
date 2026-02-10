// AvatarSprite.tsx
// Avatar component using image sprite placeholders for emotion states

import React from 'react';
import { View, Image } from 'react-native';

// Map emotion states to image sprite URLs (replace with your own images)
const emotionSprites: Record<string, string> = {
  calm: 'https://via.placeholder.com/120?text=Calm',
  tired: 'https://via.placeholder.com/120?text=Tired',
  anxious: 'https://via.placeholder.com/120?text=Anxious',
  lonely: 'https://via.placeholder.com/120?text=Lonely',
  flat: 'https://via.placeholder.com/120?text=Flat',
  okay: 'https://via.placeholder.com/120?text=Okay',
  overwhelmed: 'https://via.placeholder.com/120?text=Overwhelmed',
  neglected: 'https://via.placeholder.com/120?text=Neglected',
};

export type AvatarProps = {
  emotion: keyof typeof emotionSprites;
  lowSocialEnergy?: boolean;
  openToCompany?: boolean;
  dontAskQuestions?: boolean;
};

export default function AvatarSprite({
  emotion,
  lowSocialEnergy,
  openToCompany,
  dontAskQuestions,
}: AvatarProps) {
  // Show sprite image for emotion
  return (
    <View
      style={{
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={{ uri: emotionSprites[emotion] || emotionSprites['okay'] }}
        style={{ width: 120, height: 120, borderRadius: 60 }}
        resizeMode="cover"
      />
    </View>
  );
}
