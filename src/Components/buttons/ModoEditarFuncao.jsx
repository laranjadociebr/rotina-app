import React from 'react';
import { Alert } from 'react-native';

// Função utilitária para abrir a tela de configuração de rotina em modo de edição
export function abrirModoEditar(navigation, rotina, slotIndex = null) {
  return () => {
    try {
      console.log('abrirModoEditar chamado para rotina:', rotina, 'slot:', slotIndex);
      Alert.alert('Depuração', 'Abrir modo de edição: ' + (rotina?.nomeRotina ?? 'Rotina'));

      if (!navigation) return;

      navigation.navigate('ConfigurarRotina', {
        rotinaId: rotina?.id ?? null,
        nomeRotina: rotina?.nomeRotina ?? 'Rotina',
        slotIndex: slotIndex,
        initialData: rotina ?? null,
      });
    } catch (e) {
      console.log('Erro em abrirModoEditar:', e);
    }
  };
}

export default abrirModoEditar;
