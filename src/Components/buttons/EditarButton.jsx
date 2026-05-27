import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const EditarButtonCriar = ({ onPress }) => {

    return (

        <TouchableOpacity onPress={onPress}>

            <FontAwesome6
                name="pencil"
                size={24}
                color="white"
            />

        </TouchableOpacity>
    );
}