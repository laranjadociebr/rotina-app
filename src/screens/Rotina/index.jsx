import React, {
  useState,
  useEffect,
  useCallback
} from "react";

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import {
  useFocusEffect,
  useRoute,
  useNavigation
} from "@react-navigation/native";

import { CardMenuRotina } from '../../Components/cards/CardMenuRotina';

import { RotinaButtonCriar } from '../../Components/buttons/RotinaButton';

import { abrirModoEditar } from '../../Components/buttons/ModoEditarFuncao';

import { LinearGradient } from 'expo-linear-gradient';

import {
  enviarNotificacaoTarefa
} from "../../services/notificacoes";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import api from "../../services/api";

const MAX_SLOTS = 3;

export default function Rotina() {

  const navigation = useNavigation();

  const route = useRoute();

  const [slots, setSlots] =
    useState(Array(MAX_SLOTS).fill(null));

  const [loading, setLoading] =
    useState(false);

  async function buscarRotinas() {

    try {

      setLoading(true);

      const response =
        await api.get("/Rotinas");

      const rotinas =
        Array.isArray(response.data)
          ? response.data.slice(0, MAX_SLOTS)
          : [];

      const filledSlots =
        Array(MAX_SLOTS).fill(null);

      rotinas.forEach((rotina, index) => {

        filledSlots[index] = rotina;

      });

      setSlots(filledSlots);

    } catch (error) {

      console.log(
        "Erro ao buscar rotinas:",
        error
      );

    } finally {

      setLoading(false);

    }
  }

  function fillSlot(
    rotina,
    slotIndex = null
  ) {

    setSlots((prevSlots) => {

      const nextSlots =
        [...prevSlots];

      const targetIndex =
        slotIndex != null
          ? slotIndex
          : nextSlots.findIndex(
            (slot) => slot == null
          );

      if (
        targetIndex < 0 ||
        targetIndex >= MAX_SLOTS
      ) {
        return nextSlots;
      }

      nextSlots[targetIndex] = rotina;

      return nextSlots;
    });
  }

  useEffect(() => {

    buscarRotinas();

  }, []);

  useFocusEffect(

    useCallback(() => {

      const createdRotina =
        route.params?.createdRotina;

      const slotIndex =
        route.params?.slotIndex;

      if (createdRotina) {

        fillSlot(
          createdRotina,
          slotIndex
        );

        navigation.setParams({
          createdRotina: null,
          slotIndex: null
        });
      }

      buscarRotinas();

      return () => { };

    }, [route.params])
  );

  // =========================
  // NOTIFICAÇÕES AUTOMÁTICAS
  // =========================

  useEffect(() => {

    let ultimaTarefaNotificada =
      null;

    const verificarTarefaAtual =
      async () => {

        const tarefas = slots
          .filter(Boolean)
          .flatMap(
            rotina => rotina.tarefas || []
          );

        if (
          !tarefas ||
          tarefas.length === 0
        ) {
          return;
        }

        const agora = new Date();

        const agoraMinutos =
          agora.getHours() * 60 +
          agora.getMinutes();

        const tarefaAtual =
          tarefas.find((tarefa) => {

            if (
              !tarefa.horarioInicio ||
              !tarefa.horarioFim
            ) {
              return false;
            }

            const inicio =
              new Date(
                `1970-01-01T${tarefa.horarioInicio}`
              );

            const fim =
              new Date(
                `1970-01-01T${tarefa.horarioFim}`
              );

            const inicioMinutos =
              inicio.getHours() * 60 +
              inicio.getMinutes();

            const fimMinutos =
              fim.getHours() * 60 +
              fim.getMinutes();

            return (
              agoraMinutos >=
              inicioMinutos &&
              agoraMinutos <=
              fimMinutos
            );
          });

        if (tarefaAtual) {

          const identificador =
            `${tarefaAtual.nomeTarefa}-${tarefaAtual.horarioInicio}`;

          // evita repetir
          if (
            ultimaTarefaNotificada !==
            identificador
          ) {

            ultimaTarefaNotificada =
              identificador;

            console.log(
              "Notificando tarefa:",
              tarefaAtual.nomeTarefa
            );

            await enviarNotificacaoTarefa(
              tarefaAtual
            );
          }

        } else {

          ultimaTarefaNotificada =
            null;

        }
      };

    // executa imediatamente
    verificarTarefaAtual();

    // executa a cada 1 minuto
    const intervalo =
      setInterval(
        verificarTarefaAtual,
        60000
      );

    return () => {

      clearInterval(intervalo);

    };

  }, [slots]);

  async function excluirRotina(
    rotinaId
  ) {

    try {

      await api.delete(
        `/Rotinas/${rotinaId}`
      );

      setSlots((prevSlots) =>
        prevSlots.map((slot) =>
          slot?.id === rotinaId
            ? null
            : slot
        )
      );

      alert("Rotina excluída!");

    } catch (error) {

      console.log(
        "Erro ao excluir rotina:",
        error
      );

      alert("Erro ao excluir rotina");
    }
  }

  function renderSlot(
    slot,
    index
  ) {

    if (slot) {

      return (

        <CardMenuRotina

          key={`slot-${index}`}

          nomeRotina={slot.nomeRotina}

          conclusoes={
            slot.conclusoes || 0
          }

          onPress={() => { }}

          onEdit={
            abrirModoEditar(
              navigation,
              slot,
              index
            )
          }

          onDelete={() =>
            excluirRotina(slot.id)
          }

        />
      );
    }

    return (

      <View
        key={`slot-${index}`}
        style={styles.slotButton}
      >

        <RotinaButtonCriar

          onPress={() =>
            navigation.navigate(
              'ConfigurarRotina',
              {
                slotIndex: index
              }
            )
          }

        />

      </View>
    );
  }

  return (

    <LinearGradient
      colors={[
        '#18354e',
        '#335774',
        '#9e9ec55d'
      ]}
      start={[0, 0]}
      end={[0, 1]}
      style={styles.container}
    >

      <View style={styles.header}>

        <Text style={styles.headerText}>
          Minhas Rotinas
        </Text>

        <TouchableOpacity
          onPress={buscarRotinas}
          style={styles.refreshButton}
        >

          <FontAwesome6
            name="rotate"
            size={20}
            color="white"
          />

        </TouchableOpacity>

      </View>

      <View style={styles.slotsContainer}>

        {loading ? (

          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={{ marginTop: 20 }}
          />

        ) : (

          slots.map((slot, index) =>
            renderSlot(slot, index)
          )

        )}

      </View>

      <StatusBar style="auto" />

    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 42,
    paddingBottom: 8,
  },

  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },

  refreshButton: {
    padding: 8,
  },

  slotsContainer: {
    paddingTop: 42,
    paddingBottom: 70,
    alignItems: 'center',
  },

  slotButton: {
    alignItems: 'center',
    marginBottom: 36,
    width: 200,
  },

});