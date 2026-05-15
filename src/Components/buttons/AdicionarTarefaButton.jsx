import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const AdicionarTarefaButton = ({ onPress }) => {
    return (

        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome6 name="add" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '45vh',
        alignItems: 'center',
        backgroundColor: '#6363635e',
        padding: 20,
    }
});