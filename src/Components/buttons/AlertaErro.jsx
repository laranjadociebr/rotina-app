import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default function ModalErro({
    visible,
    mensagem,
    fecharModal
}) {

    return (

        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >

            <View style={styles.overlay}>

                <View style={styles.modalBox}>

                    <Text style={styles.titulo}>
                        Atenção
                    </Text>

                    <Text style={styles.mensagem}>
                        {mensagem}
                    </Text>

                    <TouchableOpacity
                        style={styles.botao}
                        onPress={fecharModal}
                    >

                        <Text style={styles.textoBotao}>
                            OK
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
    },

    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    mensagem: {
        fontSize: 16,
        marginBottom: 20,
    },

    botao: {
        backgroundColor: "#6B63FF",
        padding: 12,
        borderRadius: 10,
    },

    textoBotao: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});