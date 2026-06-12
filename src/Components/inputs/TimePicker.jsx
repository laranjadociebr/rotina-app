import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function TimePicker({
  value,
  onChange,
}) {

  const [visible, setVisible] =
    useState(false);

  const [editingType, setEditingType] =
    useState(null);

  const [startHour, setStartHour] =
    useState("00");

  const [startMinute, setStartMinute] =
    useState("00");

  const [endHour, setEndHour] =
    useState("00");

  const [endMinute, setEndMinute] =
    useState("00");

  useEffect(() => {

    if (value?.startTime) {

      const start =
        value.startTime instanceof Date
          ? value.startTime
          : new Date(value.startTime);

      const h = String(
        start.getHours()
      ).padStart(2, "0");

      const m = String(
        start.getMinutes()
      ).padStart(2, "0");

      setStartHour(h);
      setStartMinute(m);
    }

    if (value?.endTime) {

      const end =
        value.endTime instanceof Date
          ? value.endTime
          : new Date(value.endTime);

      const h = String(
        end.getHours()
      ).padStart(2, "0");

      const m = String(
        end.getMinutes()
      ).padStart(2, "0");

      setEndHour(h);
      setEndMinute(m);
    }

  }, [value]);

  const hours =
    Array.from(
      { length: 24 },
      (_, i) =>
        String(i).padStart(2, "0")
    );

  const minutes =
    Array.from(
      { length: 60 },
      (_, i) =>
        String(i).padStart(2, "0")
    );

  function openPicker(type) {

    setEditingType(type);

    setVisible(true);

  }

  function confirmarHorario() {

    const startDate = new Date();

    startDate.setHours(
      parseInt(startHour)
    );

    startDate.setMinutes(
      parseInt(startMinute)
    );

    startDate.setSeconds(0);

    const endDate = new Date();

    endDate.setHours(
      parseInt(endHour)
    );

    endDate.setMinutes(
      parseInt(endMinute)
    );

    endDate.setSeconds(0);

    onChange?.({
      startTime: startDate,
      endTime: endDate,
    });

    setVisible(false);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        Horários
      </Text>

      <View style={styles.timeInputsContainer}>

        <View style={styles.timeInputWrapper}>

          <Text style={styles.timeLabel}>
            Horário Inicial
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              openPicker("start")
            }
          >
            <Text style={styles.buttonText}>
              {startHour}:{startMinute}
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.timeInputWrapper}>

          <Text style={styles.timeLabel}>
            Horário Final
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              openPicker("end")
            }
          >
            <Text style={styles.buttonText}>
              {endHour}:{endMinute}
            </Text>
          </TouchableOpacity>

        </View>

      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >

        <View style={styles.overlay}>

          <View style={styles.modal}>

            <Text style={styles.title}>
              Selecione o horário
            </Text>

            <View
              style={styles.wheelsContainer}
            >

              <TimeWheel
                data={hours}
                selectedValue={
                  editingType === "start"
                    ? startHour
                    : endHour
                }
                onValueChange={(v) => {

                  if (
                    editingType ===
                    "start"
                  ) {
                    setStartHour(v);
                  } else {
                    setEndHour(v);
                  }

                }}
              />

              <Text
                style={styles.separator}
              >
                :
              </Text>

              <TimeWheel
                data={minutes}
                selectedValue={
                  editingType === "start"
                    ? startMinute
                    : endMinute
                }
                onValueChange={(v) => {

                  if (
                    editingType ===
                    "start"
                  ) {
                    setStartMinute(v);
                  } else {
                    setEndMinute(v);
                  }

                }}
              />

            </View>

            <View
              style={styles.buttons}
            >

              <TouchableOpacity
                onPress={() =>
                  setVisible(false)
                }
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  confirmarHorario
                }
              >
                <Text
                  style={{
                    color: "green",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Confirmar
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
}

function TimeWheel({
  data,
  selectedValue,
  onValueChange,
}) {

  const ITEM_HEIGHT = 50;

  const scrollRef =
    useRef(null);

  useEffect(() => {

    const index =
      data.indexOf(
        selectedValue
      );

    if (
      scrollRef.current &&
      index >= 0
    ) {

      setTimeout(() => {

        scrollRef.current.scrollTo({
          y:
            index *
            ITEM_HEIGHT,
          animated: false,
        });

      }, 50);

    }

  }, []);

  return (

    <View
      style={{
        width: 90,
        height:
          ITEM_HEIGHT * 5,
      }}
    >

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * 2,
        }}
        onScroll={(event) => {

          const offsetY =
            event.nativeEvent.contentOffset.y;

          const index =
            Math.round(offsetY / ITEM_HEIGHT);

          if (data[index] !== undefined) {
            onValueChange(data[index]);
          }

        }}
      >

        {data.map((item, index) => (

          <TouchableOpacity
            key={item}
            style={{
              height: ITEM_HEIGHT,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {

              onValueChange(item);

              scrollRef.current?.scrollTo({
                y: index * ITEM_HEIGHT,
                animated: true,
              });

            }}
          >

            <Text
              style={{
                fontSize:
                  item === selectedValue
                    ? 38
                    : 30,

                fontWeight:
                  item === selectedValue
                    ? "bold"
                    : "normal",

                color:
                  item === selectedValue
                    ? "#ffffff"
                    : "#999",
              }}
            >
              {item}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      <View
        pointerEvents="none"
        style={{
          position:
            "absolute",
          top:
            ITEM_HEIGHT * 2,
          left: 0,
          right: 0,
          height:
            ITEM_HEIGHT,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#ccc",
        }}
      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 16,
  },

  label: {
    color: "#fff",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      "rgba(0,0,0,0.5)",
  },

  modal: {
    backgroundColor: "rgb(107, 99, 255)",
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  wheelsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  separator: {
    fontSize: 40,
    fontWeight: "bold",
    marginHorizontal: 10,
  },

  buttons: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: 20,
  },
  timeInputsContainer: {
    flexDirection: "row",
    gap: 12,
  },

  timeInputWrapper: {
    flex: 1,
  },

  timeLabel: {
    color: "#ffffff",
    marginBottom: 6,
    fontSize: 14,
  },

  buttonText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },

});