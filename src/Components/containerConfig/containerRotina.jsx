import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import PickerTarefa from "../../Components/inputs/PickerTarefa";
import NomeTarefa from "../../Components/inputs/NomeTarefa";
import TimePicker from "../inputs/TimePicker";
import WeekdayPicker from "../inputs/WeekdayPicker";
import PickerDuracao from "../inputs/PickerDuracao";

export default function InserirDadosRotina() {
    const [tarefaSelecionada, setTarefaSelecionada] = useState("");
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [horario, setHorario] = useState(null);
    const [diaSemana, setDiaSemana] = useState("");

    return (
        <View contentContainerStyle={styles.container}>
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
    },
    infoBox: {
        marginTop: 20,
    },
});