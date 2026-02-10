
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyCheckInScreen from './app/DailyCheckInScreen';
import VirtualEmotionWorldScreen from './app/VirtualEmotionWorldScreen';
import RealWorldMapScreen from './app/RealWorldMapScreen';
import JournalingScreen from './app/JournalingScreen';
import { View, Button } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <Button title="Daily Check-In" onPress={() => navigation.navigate('CheckIn')} />
      <Button title="Virtual Emotion World" onPress={() => navigation.navigate('VirtualWorld')} />
      <Button title="Activity Map" onPress={() => navigation.navigate('Map')} />
      <Button title="Journal" onPress={() => navigation.navigate('Journal')} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CheckIn" component={DailyCheckInScreen} options={{ title: 'Daily Check-In' }} />
        <Stack.Screen name="VirtualWorld" component={VirtualEmotionWorldScreen} options={{ title: 'Virtual Emotion World' }} />
        <Stack.Screen name="Map" component={RealWorldMapScreen} options={{ title: 'Activity Map' }} />
        <Stack.Screen name="Journal" component={JournalingScreen} options={{ title: 'Private Journal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
