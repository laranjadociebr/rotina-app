import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const EditarButtonCriar = () => {
    return(
        <View>
            <TouchableOpacity style={styles.button}>
                <FontAwesome6 name="pencil" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )

    
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    texto: {
        color: '#fff',
        marginLeft: 5,
    }
});