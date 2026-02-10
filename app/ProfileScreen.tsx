// ProfileScreen.tsx
// Screen for editing avatar, profile, and daily check-in timing

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import AvatarSprite from '../components/AvatarSprite';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

const EMOTIONS = ['calm', 'tired', 'anxious', 'lonely', 'flat', 'okay', 'overwhelmed', 'neglected'];

export default function ProfileScreen({ navigation }: { navigation: any }) {
  // Profile state
  const [displayName, setDisplayName] = useState('');
  const [avatarEmotion, setAvatarEmotion] = useState('okay');
  const [checkInHour, setCheckInHour] = useState(22);
  const [checkInMinute, setCheckInMinute] = useState(0);

  // Save profile (mock)
  const handleSave = () => {
    // Save profile/avatar/check-in time to Firestore or local storage
    Alert.alert('Profile saved!');
    // TODO: Update notification schedule with new time
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Profile & Settings</Text>
      <Text style={{ marginBottom: 8 }}>Display Name</Text>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter your name"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 }}
      />
      <Text style={{ marginBottom: 8 }}>Avatar Emotion</Text>
      <Picker
        selectedValue={avatarEmotion}
        onValueChange={setAvatarEmotion}
        style={{ marginBottom: 16 }}
      >
        {EMOTIONS.map((emotion) => (
          <Picker.Item key={emotion} label={emotion} value={emotion} />
        ))}
      </Picker>
      <AvatarSprite emotion={avatarEmotion} />
      <Text style={{ marginTop: 24, marginBottom: 8 }}>Preferred Daily Check-In Time</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Text>Hour:</Text>
        <Picker
          selectedValue={checkInHour}
          onValueChange={setCheckInHour}
          style={{ width: 80 }}
        >
          {[...Array(24).keys()].map((h) => (
            <Picker.Item key={h} label={h.toString()} value={h} />
          ))}
        </Picker>
        <Text>Minute:</Text>
        <Picker
          selectedValue={checkInMinute}
          onValueChange={setCheckInMinute}
          style={{ width: 80 }}
        >
          {[0, 15, 30, 45].map((m) => (
            <Picker.Item key={m} label={m.toString()} value={m} />
          ))}
        </Picker>
      </View>
      <Button title="Save Profile" onPress={handleSave} />
    </View>
  );
}
