import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import InserirDadosRotina from "../../Components/containerConfig/containerRotina";

export default function ConfigurarTarefa({ route }) {
    return (
        <LinearGradient
            colors={["#21226D", "#3F41D3"]}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <InserirDadosRotina 
                    adicionarTarefa={route?.params?.adicionarTarefa}
                    initialData={route?.params?.initialData}
                    editIndex={route?.params?.editIndex}
                    isExistingRotina={route?.params?.isExistingRotina}
                    onSaveEdit={route?.params?.onSaveEdit}
                    onDelete={route?.params?.onDelete}
                />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 11,
    },
});