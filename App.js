import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { RotinaButtonCriar } from './src/Components/buttons/RotinaButtonCriar';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/pages/routes';

export default function App() {
  return (

    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>

  );
}
