import { View, StyleSheet } from "react-native";
import { SalvarButton } from "../buttons/SalvarButton";

export default function CardBottomSalvar({ visible, onSalvar }) {
  if (!visible) {
    return null;
  }

  const handleSalvar = () => {
    console.log("CardBottomSalvar: botão pressionado");
    if (typeof onSalvar === "function") {
      onSalvar();
    } else {
      console.log("CardBottomSalvar: onSalvar não está definido");
    }
  };

  return (
    <View style={styles.container}>
      <SalvarButton onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    elevation: 10,
    zIndex: 10,
  },
});