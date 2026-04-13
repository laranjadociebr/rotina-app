import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimePicker({ value, onChange, label = "Horário", placeholder = "Selecione a hora" }) {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value ?? null);

  useEffect(() => {
    if (value) {
      setSelectedTime(value);
    }
  }, [value]);

  const handlePress = () => {
    setShow(true);
  };

  const handleChange = (event, date) => {
    setShow(Platform.OS === "ios");
    if (date) {
      setSelectedTime(date);
      if (onChange) onChange(date);
    }
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>
          {selectedTime ? formatTime(selectedTime) : placeholder}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={selectedTime ?? new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#333",
  },
  button: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
  },
});