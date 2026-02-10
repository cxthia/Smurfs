
import * as React from 'react';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyCheckInScreen from './app/DailyCheckInScreen';
import VirtualEmotionWorldScreen from './app/VirtualEmotionWorldScreen';
import RealWorldMapScreen from './app/RealWorldMapScreen';
import JournalingScreen from './app/JournalingScreen';
import ProfileScreen from './app/ProfileScreen';
import { Image } from 'react-native';
import { View, Button, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scheduleDailyCheckIn } from './services/NotificationService';
import AsyncStorage from "@react-native-async-storage/async-storage";


const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 32,
    letterSpacing: 2,
    textShadowColor: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  buttonGroup: {
    gap: 16,
    width: '100%',
    maxWidth: 320,
  },
});

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Avatar button in top left */}
      <View style={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ width: 48, height: 48 }}
        >
          <Image
            source={require('./assets/holdersprite.png')}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              borderWidth: 2,
              borderColor: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>Island Wellbeing</Text>
        <View style={styles.buttonGroup}>
          <Button color="#4682B4" title="Virtual Emotion World" onPress={() => navigation.navigate('VirtualWorld')} />
          <Button color="#FFD700" title="Activity Map" onPress={() => navigation.navigate('Map')} />
          <Button color="#8B4513" title="Journal" onPress={() => navigation.navigate('Journal')} />
          {/* Daily Check-In is NOT accessible from home. It will be triggered by notification at 10pm. */}
        </View>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      await Notifications.requestPermissionsAsync();

      const saved = await AsyncStorage.getItem("dailyCheckInTime");

      if (saved) {
        const { hour, minute } = JSON.parse(saved);
        await scheduleDailyCheckIn(hour, minute);
      }
    })();

    const subscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const screen = response.notification.request.content.data?.screen;
        if (screen && navigationRef.current) {
          navigationRef.current.navigate(screen);
        }
      });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        {/* DailyCheckInScreen is not accessible from navigation, only via notification */}
        <Stack.Screen name="CheckIn" component={DailyCheckInScreen} options={{ title: 'Daily Check-In', presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="VirtualWorld" component={VirtualEmotionWorldScreen} options={{ title: 'Virtual Emotion World' }} />
        <Stack.Screen name="Map" component={RealWorldMapScreen} options={{ title: 'Activity Map' }} />
        <Stack.Screen name="Journal" component={JournalingScreen} options={{ title: 'Private Journal' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile & Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


