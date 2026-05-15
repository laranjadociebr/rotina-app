import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export const SalvarButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Salvar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#6363635e',
        padding: 20,
    },
    text: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});