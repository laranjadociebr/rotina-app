import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const AdicionarTarefaButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <FontAwesome6
        name="add"
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#6363635e',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});