// DailyCheckInScreen.tsx
// Screen for daily check-ins with MCQs and optional text input
// Saves responses to Firestore and triggers emotion classification

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { classifyEmotion } from '../services/ai';

const MCQS = [
  {
    key: 'energy',
    question: 'How is your energy today?',
    options: ['Low', 'Medium', 'High'],
  },
  {
    key: 'dayType',
    question: 'What kind of day is it?',
    options: ['Busy', 'Normal', 'Quiet'],
  },
  {
    key: 'socialEnergy',
    question: 'How is your social energy?',
    options: ['Low', 'Okay', 'Open'],
  },
];

export default function DailyCheckInScreen() {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelect = (key: string, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const rawData = {
        ...responses,
        text,
        createdAt: Timestamp.now(),
      };
      // Save raw responses
      await addDoc(collection(db, 'checkins'), rawData);
      // Send to LLM for emotion classification
      const emotionResult = await classifyEmotion(rawData);
      await addDoc(collection(db, 'emotionResults'), { ...emotionResult, userId: 'anon', createdAt: Timestamp.now() });
      Alert.alert('Check-in saved!');
      setResponses({});
      setText('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save check-in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Daily Check-In</Text>
      {MCQS.map((mcq) => (
        <View key={mcq.key} style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16 }}>{mcq.question}</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {mcq.options.map((option) => (
              <Button
                key={option}
                title={option}
                onPress={() => handleSelect(mcq.key, option)}
                color={responses[mcq.key] === option ? '#4F8EF7' : '#ccc'}
              />
            ))}
          </View>
        </View>
      ))}
      <Text style={{ marginTop: 16 }}>Anything else? (optional, emojis allowed)</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type here..."
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginTop: 8 }}
        multiline
      />
      <Button title={loading ? 'Saving...' : 'Submit'} onPress={handleSubmit} disabled={loading} />
    </View>
  );
}
