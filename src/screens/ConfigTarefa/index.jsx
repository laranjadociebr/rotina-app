import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InserirDadosRotina from "../../Components/containerConfig/containerRotina";

export default function ConfigurarTarefa() {

    return (
        <LinearGradient
            colors={["#21226D", "#3F41D3"]}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <InserirDadosRotina />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        padding: 16,
    },
});