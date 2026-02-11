
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DailyCheckInScreen from '../app/DailyCheckInScreen';
import JournalingScreen from '../app/JournalingScreen';
import ProfileScreen from '../app/ProfileScreen';
import RealWorldMapScreen from '../app/RealWorldMapScreen';
import VirtualEmotionWorldScreen from '../app/VirtualEmotionWorldScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Daily Check-In">
          <Stack.Screen name="Daily Check-In" component={DailyCheckInScreen} />
          <Stack.Screen name="Virtual Emotion World" component={VirtualEmotionWorldScreen} />
          <Stack.Screen name="Activity Map" component={RealWorldMapScreen} />
          <Stack.Screen name="Journal" component={JournalingScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

