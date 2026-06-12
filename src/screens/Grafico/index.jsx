import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Grafico() {
    return (
        <LinearGradient colors={[
                 '#000000',
                 '#000000',
                 '#000014e7'
                ]}
                 start={[0, 0]}
                  end={[0, 1]}
                 style={styles.container}>
            <Text style={styles.texto}>Nenhum histórico registrado</Text>
            
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
  texto: {
    fontSize: 18,
    color: '#ffffff',
  },
});