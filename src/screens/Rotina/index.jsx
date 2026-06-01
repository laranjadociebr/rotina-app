import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { RotinaButtonCriar } from '../../Components/buttons/RotinaButton';
import { LinearGradient } from 'expo-linear-gradient';
import api from "../../services/api";

export default function Rotina({ navigation }) {

  async function buscarRotinas() {

  try {

    const response = await api.get("/Rotinas");

    setRotinas(response.data);

  } catch (error) {

    console.log(error);

  }
}
  return (
       <LinearGradient colors={[
         '#18354e',
         '#335774',
         '#9e9ec55d'
        ]}
         start={[0, 0]}
          end={[0, 1]}
         style={styles.container}>
          <RotinaButtonCriar onPress={() => navigation.navigate('ConfigurarRotina')} />
          <RotinaButtonCriar />
          <RotinaButtonCriar />
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