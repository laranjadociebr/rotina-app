import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { RotinaButtonCriar } from '../../Components/buttons/RotinaButtonCriar';

export default function Rotina() {
    return (
        <View style={styles.container}>
            <Text>Teste Página Rotina</Text>
            <RotinaButtonCriar />
            <RotinaButtonCriar />
            <RotinaButtonCriar />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});