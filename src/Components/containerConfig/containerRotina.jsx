import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Modal } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PickerTarefa from "../../Components/inputs/PickerTarefa";
import NomeTarefa from "../../Components/inputs/NomeTarefa";
import TimePicker from "../inputs/TimePicker";
import WeekdayPicker from "../inputs/WeekdayPicker";
import PickerDuracao from "../inputs/PickerDuracao";
import { SalvarButton } from "../buttons/SalvarButton";
import { Picker } from "react-native-web";
import LocalizacaoTarefa from "../inputs/LocalizacaoTarefa";
import ModalErro from "../../Components/buttons/AlertaErro";
import { formatTime } from "../../utils/formatTime";
import { ExcluirButtonCriar } from "../buttons/ExcluirButton";
import api from "../../services/api";
import { TouchableOpacity } from "react-native";


export default function InserirDadosRotina({ adicionarTarefa, initialData = null, editIndex = null, isExistingRotina = false, onSaveEdit = null, onDelete = null }) {
    const navigation = useNavigation();
    const route = useRoute(); // 🔥 ESSENCIAL

    const [tarefaSelecionada, setTarefaSelecionada] = useState("");
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [horario, setHorario] = useState({
        startTime: "",
        endTime: "",
    });
    const [diaSemana, setDiaSemana] = useState("");
    const [duracao, setDuracao] = useState("");

    const [mostrarErro, setMostrarErro] = useState(false);

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

    useEffect(() => {
        console.log("INITIAL DATA COMPLETO:", initialData);
    }, [initialData]);

    function converterHorario(horario) {
        if (!horario) return null;

        const partes = horario.split(":");

        const h = Number(partes[0]);
        const m = Number(partes[1]);

        const data = new Date();

        data.setHours(h);
        data.setMinutes(m);
        data.setSeconds(0);
        data.setMilliseconds(0);

        return data;
    }
    async function salvarDadosRotina() {

        const novaTarefa = {
            nomeTarefa,
            tarefaSelecionada,
            horarioInicio: formatTime(horario.startTime),
            horarioFim: formatTime(horario.endTime),
            diaSemana,
            duracao,
        };

        if (
            !nomeTarefa.trim() ||
            !tarefaSelecionada ||
            !horario.startTime ||
            !horario.endTime ||
            !diaSemana ||
            !duracao
        ) {
            setMostrarErro(true);
            return;
        }

        // 🔥 EDITAR
        if (onSaveEdit) {
            console.log("EDITANDO TAREFA");

            await onSaveEdit(novaTarefa);

            navigation.goBack();
            return;
        }

        // ➕ NOVA
        adicionarTarefa?.(novaTarefa);

        navigation.goBack();
    }

    async function deletarTarefa(id) {
        console.log("DELETE ID:", id);

        try {
            await api.delete(`/tarefas/${id}`);
            setShowConfirmDelete(false);
            if (onDelete) {
                onDelete(id);
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
            Alert.alert("Erro", "Não foi possível deletar a tarefa");
        }
    }

    useEffect(() => {

        console.log("INITIAL DATA COMPLETO:", initialData);
        if (initialData) {
            setNomeTarefa(initialData.nomeTarefa ?? "");
            setTarefaSelecionada(initialData.tarefaSelecionada ?? "");
            setHorario({
                startTime:
                    initialData.horarioInicio
                        ? converterHorario(initialData.horarioInicio)
                        : null,

                endTime:
                    initialData.horarioFim
                        ? converterHorario(initialData.horarioFim)
                        : null,
            });
            setDiaSemana(initialData.diaSemana ?? "");
            setDuracao(initialData.duracao ?? "");
        }
    }, [initialData]);

    function abrirConfirmacaoExclusao() {
        setShowConfirmDelete(true);
    }

    return (
        <View style={styles.container}>
            <ModalErro
                visible={mostrarErro}
                mensagem="Preencha todos os campos"
                fecharModal={() =>
                    setMostrarErro(false)
                }
            />
            <ExcluirButtonCriar
                visible={!!initialData && isExistingRotina}
                onPress={abrirConfirmacaoExclusao}
                style={styles.excluirButton}
            />

            <NomeTarefa
                value={nomeTarefa}
                onChangeText={setNomeTarefa}
                placeholder="Digite o nome da tarefa"
            />
            <PickerTarefa
                value={tarefaSelecionada}
                onChange={setTarefaSelecionada}
            />

            <TimePicker
                value={horario}
                onChange={setHorario}
            />

            <WeekdayPicker
                value={diaSemana}
                onChange={setDiaSemana}
            />

            <PickerDuracao
                value={duracao}
                onChange={setDuracao}
            />

            <SalvarButton onPress={salvarDadosRotina} />





            <Modal
                visible={showConfirmDelete}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>

                        <Text style={styles.modalTitle}>
                            Você deseja excluir esta TAREFA?
                        </Text>

                        <Text style={styles.modalSubtitle}>
                            Essa ação não pode ser desfeita.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowConfirmDelete(false)}
                            >
                                <Text style={{ color: "#fff" }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => deletarTarefa(initialData?.id)}
                            >
                                <Text style={{ color: "#fff" }}>Excluir</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: 30,
        paddingHorizontal: 0,
    },
    excluirButton: {
        alignSelf: "flex-end",
        marginBottom: 12,
    },
    infoBox: {
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalBox: {
        width: "80%",
        backgroundColor: "#1e1e1e",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },

    modalTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },

    modalSubtitle: {
        color: "#aaa",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
    },

    modalButtons: {
        flexDirection: "row",
        gap: 10,
    },

    cancelButton: {
        backgroundColor: "#666",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },

    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
});