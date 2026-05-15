import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AdicionarTarefaButton } from "../../Components/buttons/AdicionarTarefaButton";

export default function ConfigurarRotina() {
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={["#21226d", "#3f42d3cc"]}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <AdicionarTarefaButton onPress={() => navigation.navigate('ConfigurarTarefa')} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        
    }
});