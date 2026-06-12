import {
    StyleSheet,
    View,
    Text
} from "react-native";

import { EditarButtonCriar } from "../buttons/EditarButton";
import { ordenarDias } from "../../utils/diasSemana";

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

            // Se já estiver no formato HH:mm ou HH:mm:ss
            if (typeof value === "string") {

                const match = value.match(/^(\d{2}):(\d{2})/);

                if (match) {
                    return `${match[1]}:${match[2]}`;
                }

                const data = new Date(value);

                if (!isNaN(data)) {

                    const hh = String(
                        data.getHours()
                    ).padStart(2, "0");

                    const mm = String(
                        data.getMinutes()
                    ).padStart(2, "0");

                    return `${hh}:${mm}`;
                }

                return value;
            }

            if (value instanceof Date) {

                const hh = String(
                    value.getHours()
                ).padStart(2, "0");

                const mm = String(
                    value.getMinutes()
                ).padStart(2, "0");

                return `${hh}:${mm}`;
            }

            return "";
        };

        const inicio = formatValue(start);
        const fim = formatValue(end);

        if (inicio && fim) {
            return `${inicio} - ${fim}`;
        }

        return inicio || fim;
    };

    const formatDias = (d) => {
        if (!d) return "";

        if (Array.isArray(d)) {

            if (d.length === 0) return "";

            const ordenado = ordenarDias(d);

            if (ordenado.length === 1) return ordenado[0];

            return `${ordenado[0]} - ${ordenado[ordenado.length - 1]}`;
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

    console.log("onEdit recebido:", onEdit);

    return (

        <View style={styles.card}>

            {/* HEADER */}
            <View style={styles.header}>

                <View style={styles.nomeContainer}>

                    <Text style={styles.nome}>
                        {capitalize(nomeTarefa)}
                    </Text>

                </View>

                <EditarButtonCriar
                    onPress={() => {
                        console.log("ONEDIT CHAMADO");
                        onEdit?.();
                    }}
                />

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
        backgroundColor: "#ecebff2f",
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
        pointerEvents: "none",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },

    nome: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
    },

    tipo: {
        color: "#ffffff",
        fontWeight: "bold",
    },

    horario: {
        color: "#ffffff",
        fontWeight: "bold",
    },

    diasemana: {
        color: "#ffffff",
        fontWeight: "bold",
    },

    duracao: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});