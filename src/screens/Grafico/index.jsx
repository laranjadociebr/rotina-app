import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Grafico() {
    return (
        <LinearGradient colors={[
                 '#18354e',
                 '#335774',
                 '#9e9ec55d'
                ]}
                 start={[0, 0]}
                  end={[0, 1]}
                 style={styles.container}>
            <Text>Teste Página Gráfico</Text>
            
            <StatusBar style="auto" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});