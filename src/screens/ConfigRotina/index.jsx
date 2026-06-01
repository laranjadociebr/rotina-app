import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import CardBottomSalvar from "../../Components/cards/CardBottomSalvar";

import { AdicionarTarefaButton } from "../../Components/buttons/AdicionarTarefaButton";
import { AdicionarCard } from "../../Components/cards/CardRotina";

import api from "../../services/api";

export default function ConfigurarRotina() {

    const navigation = useNavigation();
    const route = useRoute();
    const rotinaId = route?.params?.rotinaId ?? null;
    const nomeRotina = route?.params?.nomeRotina ?? "Rotina";

    const [tarefas, setTarefas] = useState([]);

    function adicionarTarefa(novaTarefa) {

        console.log("Adicionando tarefa:", novaTarefa);

        setTarefas((prev) => [
            ...prev,
            novaTarefa
        ]);
    }

    async function salvarRotina() {
        console.log("BOTÃO CLICADO");

        const novaRotina = {
            nomeRotina,
            tarefas: tarefas,
        };

        console.log("Payload rotina:", novaRotina);

        try {
            let response;

            if (rotinaId) {
                console.log("Atualizando rotina existente com PUT /Rotinas/" + rotinaId);
                response = await api.put(`/Rotinas/${rotinaId}`, novaRotina);
            } else {
                console.log("Criando nova rotina com POST /Rotinas");
                response = await api.post("/Rotinas", novaRotina);
            }

            console.log(response.data);
            alert("Rotina salva!");
            navigation.navigate("Tabs", { screen: "Rotina" });
        } catch (error) {
            console.log(error.response?.data || error);
        }
    }

    async function atualizarRotinaServer(updatedTarefas) {
        if (!rotinaId) {
            console.log("Nenhum rotinaId definido; atualização no servidor ignorada.");
            return;
        }

        const payload = {
            nomeRotina,
            tarefas: updatedTarefas,
        };

        try {
            console.log("Enviando PUT /Rotinas/" + rotinaId, payload);
            const response = await api.put(`/Rotinas/${rotinaId}`, payload);
            console.log("Rotina atualizada no servidor:", response.data);
        } catch (error) {
            console.log("Erro ao atualizar rotina no servidor:", error.response?.data || error);
        }
    }

    console.log("Tarefas atuais:", tarefas);

    return (

        <LinearGradient
            colors={["#21226d", "#3f42d3cc"]}
            style={styles.gradient}
        >

            <View style={styles.container}>

                <FlatList

                    data={tarefas}

                    keyExtractor={(item, index) =>
                        index.toString()
                    }

                    renderItem={({ item, index }) => (

                        <AdicionarCard

                            nomeTarefa={item.nomeTarefa}
                            tarefaSelecionada={item.tarefaSelecionada}
                            horarioInicio={item.horarioInicio}
                            horarioFim={item.horarioFim}
                            diaSemana={item.diaSemana}
                            duracao={item.duracao}

                            onEdit={() => navigation.navigate(
                                "ConfigurarTarefa",
                                {
                                    adicionarTarefa,
                                    initialData: item,
                                    editIndex: index,

                                    onSaveEdit: async (updated) => {
                                        const newTarefas = tarefas.map((t, i) =>
                                            i === index ? updated : t
                                        );

                                        setTarefas(newTarefas);
                                        await atualizarRotinaServer(newTarefas);
                                    }
                                }
                            )}

                        />

                    )}

                    ListFooterComponent={

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

                    }

                    contentContainerStyle={{
                        paddingBottom: 120
                    }}

                />

                <CardBottomSalvar
                    visible={tarefas.length > 0}
                    onSalvar={salvarRotina}
                />

            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    gradient: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

});