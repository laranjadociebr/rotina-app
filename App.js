import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { RotinaButtonCriar } from './src/Components/buttons/RotinaButton';
import { EditarButtonCriar } from './src/Components/buttons/EditarButton';
import { ExcluirButtonCriar } from './src/Components/buttons/ExcluirButton';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/navigation/routes';

export default function App() {
  return (

    <>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>

  );
}
