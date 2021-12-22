import Main from './src/screens/Main';
import Select from './src/screens/Select';
import Stats from './src/screens/Stats';
import Notify from './src/screens/Notify';
import Night from './src/screens/Night';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';

import {
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    Inter_300Light,
    Inter_500Medium,
    Inter_600SemiBold,
    inter: require('./assets/fonts/Inter-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <StatusBar barStyle="auto" />
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Calendar" component={Stats} />
          <Stack.Screen name="Select" component={Select} />
          <Stack.Screen name="Notify" component={Notify} />
          <Stack.Screen name="Night" component={Night} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
