// JournalingScreen.tsx
// Private journaling screen, entries never shared or commented
// Weekly AI reflection outputs pattern summaries, not advice

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { db } from '../services/firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

interface Entry {
  entry: string;
  createdAt: Timestamp;
}

const JOURNAL_COLLECTION = 'journals';

export default function JournalingScreen() {
  const [entry, setEntry] = useState('');
  // List of journal entries for the user
const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch journal entries (mock user)
    const fetchEntries = async () => {
      const snapshot = await getDocs(collection(db, JOURNAL_COLLECTION));
      setEntries(snapshot.docs.map(doc => doc.data() as Entry));
    };
    fetchEntries();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, JOURNAL_COLLECTION), {
        entry,
        createdAt: Timestamp.now(),
        userId: 'anon',
      });
      setEntry('');
      Alert.alert('Saved!');
      // Refresh entries
      const snapshot = await getDocs(collection(db, JOURNAL_COLLECTION));
      setEntries(snapshot.docs.map(doc => doc.data() as Entry));
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  // Weekly reflection (mock AI summary)
  const weeklySummary = entries.length > 0 ? 'Your week: Mostly reflective, some positive moments.' : 'No entries yet.';

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#bdd9ff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Private Journal</Text>
      <TextInput
        value={entry}
        onChangeText={setEntry}
        placeholder="Write your thoughts..."
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 }}
        multiline
      />
      <Button title={loading ? 'Saving...' : 'Save Entry'} onPress={handleSave} disabled={loading} />
      <Text style={{ marginTop: 24, fontWeight: 'bold' }}>Your Entries</Text>
      <FlatList
        data={entries}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.entry}</Text>
            <Text style={{ fontSize: 12, color: '#888' }}>{item.createdAt?.toDate?.().toLocaleString?.() || ''}</Text>
          </View>
        )}
      />
      <Text style={{ marginTop: 24, fontWeight: 'bold' }}>Weekly Reflection</Text>
      <Text>{weeklySummary}</Text>
    </View>
  );
}
