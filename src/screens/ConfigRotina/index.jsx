import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { AdicionarTarefaButton } from "../../Components/buttons/AdicionarTarefaButton";
import { AdicionarCard } from "../../Components/cards/CardRotina";

export default function ConfigurarRotina() {

    const navigation = useNavigation();

    const [tarefas, setTarefas] = useState([]);

    function adicionarTarefa(novaTarefa) {

        console.log("Adicionando tarefa:", novaTarefa);

        setTarefas((prev) => [
            ...prev,
            novaTarefa
        ]);
    }

    console.log("Tarefas atuais:", tarefas);

    return (
        <LinearGradient
            colors={["#21226d", "#3f42d3cc"]}
            style={styles.gradient}
        >

            <ScrollView
                contentContainerStyle={styles.container}
            >

                {tarefas.map((item, index) => (

                    <AdicionarCard
                        key={index}
                        nomeTarefa={item.nomeTarefa}
                        tarefaSelecionada={item.tarefaSelecionada}
                        horario={item.horario}
                        diaSemana={item.diaSemana}
                        duracao={item.duracao}
                        onEdit={() => navigation.navigate(
                            "ConfigurarTarefa",
                            {
                                adicionarTarefa,
                                initialData: item,
                                editIndex: index,
                                onSaveEdit: (updated) => {
                                    setTarefas((prev) => prev.map((t, i) => i === index ? updated : t));
                                }
                            }
                        )}
                    />

                ))}

                <AdicionarTarefaButton
                    onPress={() =>
                        navigation.navigate(
                            "ConfigurarTarefa",
                            {
                                adicionarTarefa
                            }
                        )
                    }
                />

            </ScrollView>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    
});