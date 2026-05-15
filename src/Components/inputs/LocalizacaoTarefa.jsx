
/*
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import MapView, {
  Marker
} from 'react-native-maps';

export default function LocalizacaoTarefa() {

  const [local, setLocal] = useState(null);

  function selecionarLocal(event) {

    const coordenadas =
      event.nativeEvent.coordinate;

    setLocal(coordenadas);

    console.log(coordenadas);
  }

  return (
    <View style={{ flex: 1 }}>

      <Text style={styles.titulo}>
        Selecione o local da tarefa
      </Text>

      <MapView
        style={styles.map}

        initialRegion={{
          latitude: -18.9186,
          longitude: -48.2772,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}

        onPress={selecionarLocal}
      >

        {local && (
          <Marker
            coordinate={local}
            title="Local da tarefa"
          />
        )}

      </MapView>

      {local && (
        <View style={styles.info}>

          <Text>
            Latitude:
            {local.latitude}
          </Text>

          <Text>
            Longitude:
            {local.longitude}
          </Text>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },

  map: {
    flex: 1,
  },

  info: {
    padding: 15,
    backgroundColor: '#fff',
  }

});

*/