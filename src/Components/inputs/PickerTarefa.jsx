import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PickerTarefa({ value, onChange }) {
  // valor atualmente selecionado no picker
  // se vier um value por props, usa ele; senão, usa "estudo" por padrão
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  // função chamada quando o usuário muda a opção
  // ela atualiza o estado local e também chama a callback onChange
  const handleChange = (itemValue) => {
    setSelectedValue(itemValue);
    if (onChange) onChange(itemValue);
  };

  return (
    <View style={styles.container}>
        <Text>Tipo da tarefa:</Text>
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
        <Picker.Item label="Personalizar" value="personalizar" />
      </Picker>
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
});