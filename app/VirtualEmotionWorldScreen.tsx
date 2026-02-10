// VirtualEmotionWorldScreen.tsx
// World A: 2D scrollable canvas, avatars grouped by emotion, anonymous interaction

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AvatarSprite from '../components/AvatarSprite';

const EMOTIONS = ['soft cloud', 'sleepy kitten', 'fluttery tummy', 'lost balloon', 'pancake face', 'sunbeam', 'tangled yarn', 'thunderstorm', 'forgotten toy', 'sparkly pop'];

export default function VirtualEmotionWorldScreen() {
  // List of avatars in the world, each with id and emotion
  const [avatars, setAvatars] = useState<{ id: string; emotion: string }[]>([]);

  useEffect(() => {
    // Poll Firestore for avatars (mock logic)
    const fetchAvatars = async () => {
      // For demo, mock data
      setAvatars([
        { id: '1', emotion: 'soft cloud' },
        { id: '2', emotion: 'fluttery tummy' },
        { id: '3', emotion: 'lost balloon' },
        { id: '4', emotion: 'sunbeam' },
      ]);
    };
    fetchAvatars();
  }, []);

  return (
    <ScrollView style={styles.container} horizontal>
      {EMOTIONS.map((emotion) => (
        <View key={emotion} style={styles.group}>
          <Text style={styles.label}>{emotion}</Text>
          {avatars.filter(a => a.emotion === emotion).map((a) => (
            <AvatarSprite key={a.id} emotion={emotion} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  group: { marginRight: 24, alignItems: 'center' },
  label: { fontWeight: 'bold', marginBottom: 8 },
});
