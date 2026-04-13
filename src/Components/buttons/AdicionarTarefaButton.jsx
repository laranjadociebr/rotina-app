import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const AdicionarTarefaButton = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <FontAwesome6 name="add" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    }
});