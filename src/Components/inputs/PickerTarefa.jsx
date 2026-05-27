import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

const opcoes = [
  { label: "Estudo", value: "estudo" },
  { label: "Trabalho", value: "trabalho" },
  { label: "Exercício Físico", value: "exercicio" },
  { label: "Escola", value: "escola" },
  { label: "Lazer", value: "lazer" },
  { label: "Outro...", value: "outro" },
];

export default function PickerTarefa({ value, onChange }) {

  const initialIsCustom = value && !opcoes.find((o) => o.value === value);
  const [selecionado, setSelecionado] = useState(initialIsCustom ? "outro" : (value ?? ""));
  const [modalVisible, setModalVisible] = useState(false);
  const [outroTexto, setOutroTexto] = useState(initialIsCustom ? value : "");

  // keep internal state in sync if `value` prop changes
  useEffect(() => {
    const isCustom = value && !opcoes.find((o) => o.value === value);
    setSelecionado(isCustom ? "outro" : (value ?? ""));
    setOutroTexto(isCustom ? value : "");
  }, [value]);

  const selecionarOpcao = (item) => {

    setSelecionado(item.value);

    if (onChange && item.value !== "outro") {
      onChange(item.value);
    }

    setModalVisible(false);
  };

  const textoSelecionado =
    (selecionado === "outro" ? (outroTexto || "Outro...") : (opcoes.find((item) => item.value === selecionado)?.label))
    || (selecionado && typeof selecionado === "string" ? selecionado : "Selecione uma opção");

  return (
    <View>

      <Text style={styles.label}>
        Tipo da tarefa
      </Text>

      {/* botão do select */}
      <TouchableOpacity
        style={styles.select}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>
          {textoSelecionado}
        </Text>

        <Text style={styles.icon}>
          ▼
        </Text>
      </TouchableOpacity>

      {/* modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
      >

        <SafeAreaView
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >

          <View style={styles.modalBox}>

            <ScrollView>

              {opcoes.map((item) => (

                <TouchableOpacity
                  key={item.value}
                  style={styles.option}
                  onPress={() => selecionarOpcao(item)}
                >
                  <Text style={styles.optionText}>
                    {item.label}
                  </Text>
                </TouchableOpacity>

              ))}

            </ScrollView>

          </View>

        </SafeAreaView>

      </Modal>

      {/* input outro */}
      {selecionado === "outro" && (
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          placeholderTextColor="#999"
          value={outroTexto}
          onChangeText={(texto) => {
            setOutroTexto(texto);
            if (onChange) {
              onChange(texto);
            }
          }}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  label: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },

  select: {
    backgroundColor: "#ffffff",

    borderWidth: 2,
    borderColor: "#6C63FF",

    borderRadius: 14,

    height: 55,

    paddingHorizontal: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 6,
  },

  selectText: {
    color: "#000000",
    fontSize: 16,
  },

  icon: {
    color: "#FFF",
    fontSize: 14,
  },

  overlay: {
    flex: 1,

    backgroundColor: "#rgba(107, 99, 255, 0.45)",

    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",

    backgroundColor: "#2a2c7a",

    borderRadius: 18,

    paddingVertical: 10,

    maxHeight: 350,
  },

  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
  },

  optionText: {
    color: "#ffffff",
    fontSize: 16,
  },

  input: {
    marginTop: 14,

    backgroundColor: "#ffffff",

    color: "#000000",

    borderRadius: 12,

    padding: 14,

    borderWidth: 1,
    borderColor: "#555",
  },

});