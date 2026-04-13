import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AdicionarTarefaButton } from "../../Components/buttons/AdicionarTarefaButton";

export default function ConfigurarRotina() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <AdicionarTarefaButton onPress={() => navigation.navigate('ConfigurarTarefa')}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }
});