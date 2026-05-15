import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerTarefa({ value, onChange }) {
  // valor atualmente selecionado no picker
  // se vier um value por props, usa ele; senão, usa "estudo" por padrão
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  const [outroTexto, setOutroTexto] = useState('');

  // função chamada quando o usuário muda a opção
  // ela atualiza o estado local e também chama a callback onChange
  const handleChange = (itemValue) => {
    setSelectedValue(itemValue);
    if (onChange) onChange(itemValue);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Tipo da tarefa:</Text>
      <Picker
        selectedValue={value ?? selectedValue}
        onValueChange={handleChange}
        style={styles.picker}
      >
        <Picker.Item label="" value="" enabled={false} />
        <Picker.Item label="Estudo" value="estudo" />
        <Picker.Item label="Trabalho" value="trabalho" />
        <Picker.Item label="Exercício Físico" value="exercicio" />
        <Picker.Item label="Escola" value="escola" />
        <Picker.Item label="Lazer" value="lazer" />
        <Picker.Item label="Outro..." value="outro" />
      </Picker>
      {selectedValue === 'outro' && (
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          value={outroTexto}
          onChangeText={setOutroTexto}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  text: {
    color: "#ffffff",
  },
});