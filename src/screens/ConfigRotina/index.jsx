import { useState, useEffect, useCallback, useLayoutEffect, useRef } from "react";
import { FlatList, StyleSheet, View, SafeAreaView, Text, Modal, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, useFocusEffect, StackActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CardBottomSalvar from "../../Components/cards/CardBottomSalvar";
import { AdicionarTarefaButton } from "../../Components/buttons/AdicionarTarefaButton";
import { AdicionarCard } from "../../Components/cards/CardRotina";
import ModalErro from "../../Components/buttons/AlertaErro";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import api from "../../services/api";

export default function ConfigurarRotina() {
    const navigation = useNavigation();
    const route = useRoute();

    const rotinaId = route?.params?.rotinaId ?? route?.params?.initialData?.id ?? null;

    const [nomeRotina, setNomeRotina] = useState(
        route?.params?.nomeRotina ??
        route?.params?.initialData?.nomeRotina ??
        "Rotina"
    );

    const [saved, setSaved] = useState(false);
    const [showSaveWarning, setShowSaveWarning] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const savedRef = useRef(false);
    const [initialNomeRotina] = useState(
        route?.params?.nomeRotina ??
        route?.params?.initialData?.nomeRotina ??
        "Rotina"
    );
    const [initialTarefasCount] = useState(
        Array.isArray(route?.params?.initialData?.tarefas)
            ? route.params.initialData.tarefas.length
            : 0
    );

    const [tarefas, setTarefas] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                if (!rotinaId) return null;

                return (
                    <TouchableOpacity
                        onPress={() => setShowDeleteConfirm(true)}
                        style={styles.headerDeleteButton}
                    >
                        <FontAwesome6 name="trash" size={22} color="#ffffff" />
                    </TouchableOpacity>
                );
            },
        });
    }, [navigation, rotinaId]);

    useFocusEffect(
        useCallback(() => {
            const updatedTask = route.params?.updatedTask;
            const index = route.params?.editIndex;
            const deletedTarefaId = route.params?.deletedTarefaId;

            if (deletedTarefaId !== undefined) {
                console.log("Removendo tarefa deletada:", deletedTarefaId);

                setTarefas((prev) => 
                    prev.filter(tarefa => tarefa.id !== deletedTarefaId)
                );

                navigation.setParams({
                    deletedTarefaId: undefined,
                });
                return;
            }

            if (updatedTask && index !== undefined) {

                console.log("Atualizando tarefa editada:", updatedTask);

                setTarefas((prev) => {
                    const copy = [...prev];
                    copy[index] = updatedTask;
                    return copy;
                });

                navigation.setParams({
                    updatedTask: null,
                    editIndex: null,
                });
            }
        }, [route.params])
    );

    function adicionarTarefa(novaTarefa) {
        setTarefas((prev) => {
            const tarefaComId = {
                ...novaTarefa,

            };

            console.log("CARD ITEM:", tarefaComId);

            return [...prev, tarefaComId];
        });
    }

    useEffect(() => {
        const initialData = route?.params?.initialData;

        if (initialData) {
            setNomeRotina(initialData.nomeRotina ?? nomeRotina);
            setTarefas(Array.isArray(initialData.tarefas) ? initialData.tarefas : []);
            return;
        }

        async function carregarRotina() {
            if (!rotinaId) return;

            try {
                const resp = await api.get(`/Rotinas/${rotinaId}`);
                const data = resp.data;

                if (data) {
                    setNomeRotina(data.nomeRotina ?? nomeRotina);
                    setTarefas(Array.isArray(data.tarefas) ? data.tarefas : []);
                }
            } catch (error) {
                console.log("Erro ao carregar rotina:", error.response?.data || error);
            }
        }

        carregarRotina();
    }, [rotinaId]);

    async function salvarRotina() {
        console.log("BOTÃO CLICADO");

        const novaRotina = {
            nomeRotina,
            tarefas,
        };

        console.log("ENVIANDO:", JSON.stringify(novaRotina, null, 2));

        try {
            let response;

            if (rotinaId) {
                console.log("PUT /Rotinas/" + rotinaId);

                response = await api.put(
                    `/Rotinas/${rotinaId}`,
                    novaRotina
                );
            } else {
                console.log("POST /Rotinas");

                response = await api.post(
                    "/Rotinas",
                    novaRotina
                );
            }

            console.log("SUCESSO:", response.data);

            alert("Rotina salva!");
            savedRef.current = true;
            setSaved(true);
            navigation.dispatch(StackActions.pop(1));

        } catch (error) {
            console.log("ERRO API:");
            console.log(JSON.stringify(error.response?.data, null, 2));
        }
    }

    async function atualizarRotinaServer(updatedTarefas) {
        if (!rotinaId) return;

        const payload = {
            nomeRotina,
            tarefas: updatedTarefas,
        };

        try {
            await api.put(`/Rotinas/${rotinaId}`, payload);
        } catch (error) {
            console.log("Erro update server:", error.response?.data || error);
        }
    }

    async function excluirRotina() {
        if (!rotinaId) {
            return;
        }

        setIsDeleting(true);

        try {
            await api.delete(`/Rotinas/${rotinaId}`);
            setSaved(true);
            setShowDeleteConfirm(false);
            alert("Rotina excluída!");
            navigation.goBack();
        } catch (error) {
            console.log("Erro ao excluir rotina:", error.response?.data || error);
            alert("Não foi possível excluir a rotina.");
        } finally {
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        if (route.params?.initialData) {
            navigation.setParams({
                ...route.params,
                initialData: {
                    ...route.params.initialData,
                    tarefas,
                },
            });
        }
    }, [tarefas]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (savedRef.current) {
                return;
            }

            const hasChanges =
                tarefas.length !== initialTarefasCount ||
                nomeRotina !== initialNomeRotina;

            if (!hasChanges) {
                return;
            }

            e.preventDefault();
            setShowSaveWarning(true);
        });

        return unsubscribe;
    }, [navigation, saved, tarefas, nomeRotina, initialTarefasCount, initialNomeRotina]);

    return (
        <LinearGradient
            colors={["#21226d", "#3f42d3cc"]}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <FlatList
                    data={tarefas}
                    extraData={tarefas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {

                        console.log("CARD ITEM:", item); // 👈 AQUI É O LUGAR CERTO
                        console.log("ID:", item.id);
                        console.log("TAREFAS COMPLETAS:", tarefas);
                        console.log(tarefas)

                        return (
                            <AdicionarCard
                                nomeTarefa={item.nomeTarefa}
                                tarefaSelecionada={item.tarefaSelecionada}
                                horarioInicio={item.horarioInicio}
                                horarioFim={item.horarioFim}
                                diaSemana={item.diaSemana}
                                duracao={item.duracao}
                                onEdit={() =>
                                    navigation.navigate("ConfigurarTarefa", {
                                        initialData: item,
                                        editIndex: index,
                                        isExistingRotina: Boolean(rotinaId),
                                        onSaveEdit: (updated) => {
                                            setTarefas(prev => {
                                                const copy = [...prev];
                                                copy[index] = {
                                                    ...copy[index],
                                                    ...updated,
                                                };
                                                const next = copy;
                                                atualizarRotinaServer(next);
                                                return next;
                                            });
                                        },
                                        onDelete: (id) => {
                                            setTarefas(prev => {
                                                const next = prev.filter(tarefa => tarefa.id !== id);
                                                atualizarRotinaServer(next);
                                                return next;
                                            });
                                        }
                                    })
                                }
                            />
                        );
                    }}


                    ListFooterComponent={
                        <View style={styles.footerButtonWrapper}>
                            <AdicionarTarefaButton
                                onPress={() =>
                                    navigation.navigate("ConfigurarTarefa", {
                                        adicionarTarefa,
                                    })
                                }
                            />
                        </View>
                    }
                    contentContainerStyle={{
                        paddingBottom: 120,
                    }}
                />

                <CardBottomSalvar
                    visible={tarefas.length > 0}
                    onSalvar={salvarRotina}
                />
            </View>

            <ModalErro
                visible={showSaveWarning}
                mensagem="Você precisa salvar sua rotina"
                fecharModal={() => setShowSaveWarning(false)}
            />

            <Modal
                visible={showDeleteConfirm}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>
                            Você tem certeza de excluir esta rotina?
                        </Text>
                        <Text style={styles.modalSubtitle}>
                            Essa ação não pode ser desfeita.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowDeleteConfirm(false)}
                            >
                                <Text style={styles.modalButtonText}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={excluirRotina}
                                disabled={isDeleting}
                            >
                                <Text style={styles.modalButtonText}>
                                    {isDeleting ? 'Excluindo...' : 'Sim'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safeArea: { flex: 1 },
    container: { flex: 1, paddingTop: 54 },
    footerButtonWrapper: {
        marginTop: 24,
    },
    headerDeleteButton: {
        padding: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '85%',
        backgroundColor: '#1b1c44',
        borderRadius: 18,
        padding: 24,
        borderWidth: 1,
        borderColor: '#4f54c8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 12,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalSubtitle: {
        color: '#c7caf7',
        fontSize: 15,
        marginBottom: 22,
        textAlign: 'center',
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#3d3f73',
        alignItems: 'center',
    },
    deleteButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#d32f2f',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});