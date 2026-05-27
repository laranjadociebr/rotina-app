import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InserirDadosRotina from "../../Components/containerConfig/containerRotina";

export default function ConfigurarTarefa({ route }) {
    return (
        <LinearGradient
            colors={["#21226D", "#3F41D3"]}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <InserirDadosRotina 
                    adicionarTarefa={route?.params?.adicionarTarefa}
                    initialData={route?.params?.initialData}
                    editIndex={route?.params?.editIndex}
                    onSaveEdit={route?.params?.onSaveEdit}
                />
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