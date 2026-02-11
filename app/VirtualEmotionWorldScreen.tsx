// VirtualEmotionWorldScreen.tsx
// World A: 2D scrollable canvas, avatars grouped by emotion, anonymous interaction

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AvatarSprite from '../components/AvatarSprite';

const EMOTIONS = ['anxious', 'calm', 'confused', 'devious', 'ecstatic', 'happy', 'hungry', 'lonely', 'mad', 'motivated', 'sad', 'scared', 'tired'];

export default function VirtualEmotionWorldScreen() {
  // List of avatars in the world, each with id and emotion
  const [avatars, setAvatars] = useState<{ id: string; emotion: string }[]>([]);

useEffect(() => {
  const fetchAvatars = async () => {
    const q = query(collection(db, 'avatars'));
    const snapshot = await getDocs(q);

    interface Avatar {
      id: string;
      emotion: string;
    }

    const fetched: Avatar[] = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      emotion: doc.data().emotion,
    }));

    setAvatars(fetched);
  };

  fetchAvatars();
}, []);


  return (
    <ScrollView style={styles.container} horizontal>
      {EMOTIONS.map((emotion) => (
        <View key={emotion} style={styles.group}>
          <Text style={styles.label}>{emotion}</Text>
          {avatars.filter((a: any) => a.emotion === emotion).map((a: any) => (
            <AvatarSprite key={a.id} emotion={emotion as any} />
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
