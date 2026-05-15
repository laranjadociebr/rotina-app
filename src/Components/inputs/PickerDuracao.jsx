import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const duracoes = [
  { label: "Semanal", value: "semanal" },
  { label: "Mensal", value: "mensal" },
];

export default function PickerDuracao({
  value,
  onChange,
  label = "Duração:",
}) {

  const [selectedDuration, setSelectedDuration] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined && value !== selectedDuration) {
      setSelectedDuration(value);
    }
  }, [value]);

  const handleSelect = (durationValue) => {
    setSelectedDuration(durationValue);

    if (onChange) {
      onChange(durationValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {duracoes.map((duracao) => (
          <TouchableOpacity
            key={duracao.value}
            style={[
              styles.dayButton,
              selectedDuration === duracao.value &&
                styles.dayButtonSelected,
            ]}
            onPress={() => handleSelect(duracao.value)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDuration === duracao.value &&
                  styles.dayTextSelected,
              ]}
            >
              {duracao.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#ffffff",
  },

  scroll: {
    alignItems: "center",
  },

  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  dayButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },

  dayText: {
    color: "#333",
    fontSize: 14,
  },

  dayTextSelected: {
    color: "#fff",
  },
});