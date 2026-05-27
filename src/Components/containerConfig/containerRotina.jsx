import { useState, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PickerTarefa from "../../Components/inputs/PickerTarefa";
import NomeTarefa from "../../Components/inputs/NomeTarefa";
import TimePicker from "../inputs/TimePicker";
import WeekdayPicker from "../inputs/WeekdayPicker";
import PickerDuracao from "../inputs/PickerDuracao";
import { SalvarButton } from "../buttons/SalvarButton";
import { Picker } from "react-native-web";
import LocalizacaoTarefa from "../inputs/LocalizacaoTarefa";
import ModalErro from "../../Components/buttons/AlertaErro";

export default function InserirDadosRotina({ adicionarTarefa, initialData = null, editIndex = null, onSaveEdit = null }) {
    const navigation = useNavigation();

    const [tarefaSelecionada, setTarefaSelecionada] = useState("");
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [horario, setHorario] = useState(null);
    const [diaSemana, setDiaSemana] = useState("");
    const [duracao, setDuracao] = useState("");

    const [mostrarErro, setMostrarErro] = useState(false);

    function salvarDadosRotina() {
        const novaTarefa = {
            nomeTarefa,
            tarefaSelecionada,
            horario,
            diaSemana,
            duracao,
        };

        if (
            !nomeTarefa.trim() ||
            !tarefaSelecionada ||
            !horario ||
            !diaSemana ||
            !duracao
        ) {
            setMostrarErro(true);
            return;
        }

        if (onSaveEdit) {
            onSaveEdit(novaTarefa);
        } else {
            adicionarTarefa?.(novaTarefa);
        }
        navigation.goBack();
    }

    useEffect(() => {
        if (initialData) {
            setNomeTarefa(initialData.nomeTarefa ?? "");
            setTarefaSelecionada(initialData.tarefaSelecionada ?? "");
            setHorario(initialData.horario ?? null);
            setDiaSemana(initialData.diaSemana ?? "");
            setDuracao(initialData.duracao ?? "");
        }
    }, [initialData]);

    return (
        <View contentContainerStyle={styles.container}>
            <ModalErro
                visible={mostrarErro}
                mensagem="Preencha todos os campos"
                fecharModal={() =>
                    setMostrarErro(false)
                }
            />
            <Text style={styles.title}>Configurar Rotina</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        marginBottom: 12,
        color: "#ffffff",
    },
    infoBox: {
        marginTop: 20,
    },
});