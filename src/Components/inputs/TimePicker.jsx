import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimePicker({ value, onChange, label = "Horário:", placeholder = "Selecione a hora" }) {
  const [show, setShow] = useState(false);
  const [pickerType, setPickerType] = useState(null); // "start" ou "end"
  const [startTime, setStartTime] = useState(value?.startTime ?? null);
  const [endTime, setEndTime] = useState(value?.endTime ?? null);

  useEffect(() => {
    if (value) {
      setStartTime(value.startTime ?? null);
      setEndTime(value.endTime ?? null);
    }
  }, [value]);

  const handlePressStart = () => {
    setPickerType("start");
    setShow(true);
  };

  const handlePressEnd = () => {
    setPickerType("end");
    setShow(true);
  };

  const handleChange = (event, date) => {
    setShow(Platform.OS === "ios");
    if (date) {
      if (pickerType === "start") {
        setStartTime(date);
        if (onChange) onChange({ startTime: date, endTime });
      } else if (pickerType === "end") {
        setEndTime(date);
        if (onChange) onChange({ startTime, endTime: date });
      }
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
      <View style={styles.timeInputsContainer}>
        <View style={styles.timeInputWrapper}>
          <Text style={styles.timeLabel}>Inicial</Text>
          <TouchableOpacity onPress={handlePressStart} style={styles.button}>
            <Text style={styles.buttonText}>
              {startTime ? formatTime(startTime) : placeholder}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeInputWrapper}>
          <Text style={styles.timeLabel}>Final</Text>
          <TouchableOpacity onPress={handlePressEnd} style={styles.button}>
            <Text style={styles.buttonText}>
              {endTime ? formatTime(endTime) : placeholder}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {show && (
        <DateTimePicker
          value={pickerType === "start" ? (startTime ?? new Date()) : (endTime ?? new Date())}
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
    marginBottom: 12,
    fontSize: 14,
    color: "#ffffff",
  },
  timeInputsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  timeInputWrapper: {
    flex: 1,
  },
  timeLabel: {
    marginBottom: 6,
    fontSize: 12,
    color: "#cccccc",
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