import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import InserirDadosRotina from "../../Components/containerConfig/containerRotina";

export default function ConfigurarTarefa() {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <InserirDadosRotina/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
});