export const ordemSemana = {
    "segunda": 1,
    "terca": 2,
    "terça": 2,
    "quarta": 3,
    "quinta": 4,
    "sexta": 5,
    "sabado": 6,
    "sábado": 6,
    "domingo": 7,
};

export const ordenarDias = (dias) => {
    if (!Array.isArray(dias)) return dias;

    return [...dias].sort((a, b) => {
        const aKey = a.toLowerCase();
        const bKey = b.toLowerCase();

        return (ordemSemana[aKey] || 999) - (ordemSemana[bKey] || 999);
    });
};