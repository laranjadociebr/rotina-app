import {
    StyleSheet,
    View,
    Text
} from "react-native";

import { EditarButtonCriar } from "../buttons/EditarButton";

export const AdicionarCard = ({
    nomeTarefa,
    tarefaSelecionada,
    horarioInicio,
    horarioFim,
    diaSemana,
    duracao,
    onEdit,
}) => {

    const formatTime = (date) => {

        if (!date) return "";

        if (typeof date === "string")
            return date;

        if (date instanceof Date) {

            const hh = String(
                date.getHours()
            ).padStart(2, "0");

            const mm = String(
                date.getMinutes()
            ).padStart(2, "0");

            return `${hh}:${mm}`;
        }

        try {
            return String(date);
        } catch (e) {
            return "";
        }
    };

    const formatHorario = (start, end) => {
        const formatValue = (value) => {
            if (!value) return "";
            if (typeof value === "string") return value;
            if (value instanceof Date) return formatTime(value);
            try {
                return String(value);
            } catch (e) {
                return "";
            }
        };

        const formattedStart = formatValue(start);
        const formattedEnd = formatValue(end);

        if (formattedStart && formattedEnd) {
            return `${formattedStart} - ${formattedEnd}`;
        }

        return formattedStart || formattedEnd;
    };

    const formatDias = (d) => {

        if (!d) return "";

        if (Array.isArray(d)) {

            if (d.length === 0)
                return "";

            if (d.length === 1)
                return d[0];

            return `${d[0]} - ${d[d.length - 1]
                }`;
        }

        return String(d);
    };

    const capitalize = (str) => {

        if (!str) return "";

        return (
            str.charAt(0).toUpperCase() +
            str.slice(1)
        );
    };

    const formatAndCapitalizeDias = (
        dias
    ) => {

        const formatted =
            formatDias(dias);

        if (!formatted) return "";

        if (formatted.includes(" - ")) {

            const [first, last] =
                formatted.split(" - ");

            return `${capitalize(first)
                } - ${capitalize(last)
                }`;
        }

        return capitalize(formatted);
    };

    return (

        <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.header}>

                <View style={styles.nomeContainer}>

                    <Text style={styles.nome}>
                        {capitalize(nomeTarefa)}
                    </Text>

                </View>

                <EditarButtonCriar onPress={onEdit} />

            </View>

            {/* PRIMEIRA LINHA */}
            <View style={styles.row}>

                <Text style={styles.tipo}>
                    {capitalize(
                        tarefaSelecionada
                    )}
                </Text>

                <Text style={styles.horario}>
                    {capitalize(
                        formatHorario(horarioInicio, horarioFim)
                    )}
                </Text>

            </View>

            {/* SEGUNDA LINHA */}
            <View style={styles.row}>

                <Text style={styles.duracao}>
                    {capitalize(duracao)}
                </Text>

                <Text style={styles.diasemana}>
                    {
                        formatAndCapitalizeDias(
                            diaSemana
                        )
                    }
                </Text>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#ECEBFF",
        padding: 16,
        borderRadius: 12,
        marginTop: 12,
        gap: 6,
    },

    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
        position: "relative",
    },

    nomeContainer: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },

    nome: {
        fontSize: 18,
        fontWeight: "bold",
    },

    tipo: {
        color: "#555",
    },

    horario: {
        color: "#555",
    },

    diasemana: {
        color: "#555",
    },

    duracao: {
        color: "#555",
    },
});