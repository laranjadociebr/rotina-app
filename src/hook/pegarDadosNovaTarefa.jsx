import { useEffect } from "react";

export default function useNovaTarefa(
  route,
  setTarefas
) {

  useEffect(() => {

    const novaTarefa =
      route.params?.novaTarefa;

    if (novaTarefa) {

      setTarefas((prev) => [
        ...prev,
        novaTarefa,
      ]);

    }

  }, [route.params]);

}