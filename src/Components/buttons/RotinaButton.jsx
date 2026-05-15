import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { LinearGradient } from 'expo-linear-gradient';

// Componente de botão para criar rotina
export const RotinaButtonCriar = ({ onPress }) => {
    return (
        <LinearGradient
            colors={['#1e21809d', '#303169']} 
            style={styles.gradient}
            start={[0, 0]}
            end={[1, 1]}
        >
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <FontAwesome6 name="add" size={24} color="white" />
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        width: 200,
        height: 70,
        borderRadius: 40,
        overflow: 'hidden',
        marginBottom: 90,
        borderWidth: 3,
        borderColor: '#21226D',
        alignSelf: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

