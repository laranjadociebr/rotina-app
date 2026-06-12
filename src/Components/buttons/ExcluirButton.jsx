import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const ExcluirButtonCriar = ({ onPress, visible, style }) => {
    if (!visible) return null;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <FontAwesome6 name="trash" size={24} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
});