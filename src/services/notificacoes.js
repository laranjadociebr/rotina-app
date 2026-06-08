
import * as Notifications from "expo-notifications";

let ultimaNotificacao = null;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function pedirPermissaoNotificacao() {

  const { status } =
    await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    alert("Permissão de notificação negada");
  }
}

function gerarBarra(progresso) {

  const total = 10;

  const preenchido =
    Math.round((progresso / 100) * total);

  return (
    "█".repeat(preenchido) +
    "░".repeat(total - preenchido)
  );
}

function calcularProgresso(
  horarioInicio,
  horarioFim
) {

  const agora = new Date();

  const inicio =
    new Date(`1970-01-01T${horarioInicio}`);

  const fim =
    new Date(`1970-01-01T${horarioFim}`);

  const total =
    fim - inicio;

  const atual =
    agora - inicio;

  const porcentagem =
    Math.min(
      100,
      Math.max(
        0,
        Math.floor((atual / total) * 100)
      )
    );

  return porcentagem;
}

export async function enviarNotificacaoTarefa(
  tarefa
) {

  if (!tarefa)
    return;

  const chave =
    tarefa.nomeTarefa +
    new Date().getMinutes();

  if (ultimaNotificacao === chave)
    return;

  ultimaNotificacao = chave;

  const progresso =
    calcularProgresso(
      tarefa.horarioInicio,
      tarefa.horarioFim
    );

  const barra =
    gerarBarra(progresso);

  await Notifications.scheduleNotificationAsync({
    content: {

      title: tarefa.nomeTarefa,

      body:
        `Vamos lá! Você consegue!\n\n` +
        `${barra} ${progresso}%`,

      sticky: true,
      autoDismiss: false,
      priority: Notifications.AndroidNotificationPriority.MAX,

    },

    trigger: null,
  });
}

export function iniciarMonitoramentoRotina(
  tarefas
) {

  const intervalo = setInterval(
    async () => {

      if (!tarefas ||
          tarefas.length === 0)
        return;

      const agora = new Date();

      const tarefaAtual =
        tarefas.find((tarefa) => {

          const inicio =
            new Date(
              `1970-01-01T${tarefa.horarioInicio}`
            );

          const fim =
            new Date(
              `1970-01-01T${tarefa.horarioFim}`
            );

          const agoraMinutos =
            agora.getHours() * 60 +
            agora.getMinutes();

          const inicioMinutos =
            inicio.getHours() * 60 +
            inicio.getMinutes();

          const fimMinutos =
            fim.getHours() * 60 +
            fim.getMinutes();

          return (
            agoraMinutos >= inicioMinutos &&
            agoraMinutos <= fimMinutos
          );
        });

      if (tarefaAtual) {

        await enviarNotificacaoTarefa(
          tarefaAtual
        );

      }

    },

    60000
  );

  return intervalo;
}

