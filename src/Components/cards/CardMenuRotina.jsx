import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { EditarButtonCriar } from '../buttons/EditarButton';
import { LinearGradient } from 'expo-linear-gradient';

// Componente de card para exibir rotina criada
export const CardMenuRotina = ({
    nomeRotina = 'Rotina',
    conclusoes = 0,
    onPress,
    onEdit,
    onDelete
}) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1e21809d', '#303169']}
                style={styles.gradient}
                start={[0, 0]}
                end={[1, 1]}
                pointerEvents="box-none"
            >
                <View style={styles.button}>
                    <View style={styles.content}>
                        {/* Ícone de editar no topo direito */}
                        <EditarButtonCriar
                            onPress={() => {
                                console.log('CLICOU EDIT');
                                onEdit?.();
                            }}
                            style={[
                                styles.editIconButton,
                            ]}
                            size={18}
                        />

                        {/* Nome da rotina - Grande e em destaque */}
                        <Text style={styles.rotinaNome}>{nomeRotina}</Text>

                        {/* Conclusões */}
                        <View style={styles.conclusaoContainer}>
                            <Text style={styles.conclusaoLabel}>Concluído: </Text>
                            <Text style={styles.conclusaoValor}>{conclusoes}x</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 28,
        width: '100%',
        paddingHorizontal: 16,
    },
    gradient: {
        width: '100%',
        maxWidth: 360,
        minHeight: 140,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#21226D',
        paddingHorizontal: 20,
        paddingVertical: 18,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        width: '100%',
    },
    editIconButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 10,
        zIndex: 999,
        elevation: 10, // Android
    },
    rotinaNome: {
        fontSize: 32,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 20,
        marginTop: 8,
    },
    conclusaoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    conclusaoLabel: {
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '500',
    },
    conclusaoValor: {
        fontSize: 16,
        color: '#7FFF7F',
        fontWeight: '700',
        marginLeft: 4,
    },
});