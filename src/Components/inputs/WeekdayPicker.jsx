import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const days = [
  { label: "Segunda", value: "segunda" },
  { label: "Terça", value: "terca" },
  { label: "Quarta", value: "quarta" },
  { label: "Quinta", value: "quinta" },
  { label: "Sexta", value: "sexta" },
  { label: "Sábado", value: "sabado" },
  { label: "Domingo", value: "domingo" },
];

export default function WeekdayPicker({ value, onChange, label = "Dia da semana:" }) {
  const [selectedDays, setSelectedDays] = useState(value ?? []);

  useEffect(() => {
    if (value !== undefined && JSON.stringify(value) !== JSON.stringify(selectedDays)) {
      setSelectedDays(value);
    }
  }, [value]);

  const handleSelect = (dayValue) => {
    const newSelected = selectedDays.includes(dayValue)
      ? selectedDays.filter(day => day !== dayValue)
      : [...selectedDays, dayValue];
    setSelectedDays(newSelected);
    if (onChange) onChange(newSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {days.map((day) => (
          <TouchableOpacity
            key={day.value}
            style={[styles.dayButton, selectedDays.includes(day.value) && styles.dayButtonSelected]}
            onPress={() => handleSelect(day.value)}
          >
            <Text style={[styles.dayText, selectedDays.includes(day.value) && styles.dayTextSelected]}>{day.label}</Text>
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