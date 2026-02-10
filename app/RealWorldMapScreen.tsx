// RealWorldMapScreen.tsx
// World B: Real map (Singapore), activity pins, avatars join pins

import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
// import MapView, { Marker } from 'react-native-maps'; // Uncomment after installing
import AvatarSprite from '../components/AvatarSprite';

// Mock activity pins
const mockPins = [
  {
    id: 'pin1',
    title: 'Walk & Talk',
    time: '6pm',
    location: { latitude: 1.3521, longitude: 103.8198 },
    visibility: 'public',
    emotion: 'calm',
    joined: ['user1', 'user2'],
  },
  {
    id: 'pin2',
    title: 'Quiet Co-working',
    time: '8pm',
    location: { latitude: 1.355, longitude: 103.82 },
    visibility: 'solo',
    emotion: 'lonely',
    joined: [],
  },
];

export default function RealWorldMapScreen() {
  const [pins, setPins] = useState(mockPins);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Activity Map (Singapore)</Text>
      {/* Uncomment MapView after installing react-native-maps */}
      {/* <MapView style={{ flex: 1 }} initialRegion={{ latitude: 1.3521, longitude: 103.8198, latitudeDelta: 0.05, longitudeDelta: 0.05 }}> */}
      {pins.map((pin) => (
        <View key={pin.id} style={{ marginVertical: 12 }}>
          <Text>{pin.title} ({pin.emotion}) - {pin.time}</Text>
          <Text>Visibility: {pin.visibility}</Text>
          {/* <Marker coordinate={pin.location} /> */}
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            {pin.joined.map((userId, idx) => (
              <AvatarSprite key={userId + idx} emotion={pin.emotion} />
            ))}
          </View>
          <Button title="Join" onPress={() => {/* Add join logic */}} />
        </View>
      ))}
      {/* </MapView> */}
    </View>
  );
}
