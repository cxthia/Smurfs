
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DailyCheckInScreen from '../app/DailyCheckInScreen';
import JournalingScreen from '../app/JournalingScreen';
import ProfileScreen from '../app/ProfileScreen';
import RealWorldMapScreen from '../app/RealWorldMapScreen';
import VirtualEmotionWorldScreen from '../app/VirtualEmotionWorldScreen';

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
export default function App() {
    <NavigationContainer ref={navigationRef}>
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


export default App;


