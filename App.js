import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { fontFiles } from './src/constants/theme';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/routes/AppNavigator';
import navigationTheme from './src/routes/navigationTheme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontFiles);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <CartProvider>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </CartProvider>
  );
}
