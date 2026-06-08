import { TouchableOpacity } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const EditarButtonCriar = ({ onPress, style, size = 24, color = 'white', hitSlop }) => {
    const defaultHitSlop = hitSlop ?? { top: 10, left: 10, right: 10, bottom: 10 };
    return (
        <TouchableOpacity
            onPress={() => {
                try {
                    console.log('EditarButtonCriar: pressed');
                } catch (e) {}
                if (onPress) onPress();
            }}
            style={style}
            activeOpacity={0.7}
            hitSlop={defaultHitSlop}
        >
            <FontAwesome6 name="pencil" size={size} color={color} />
        </TouchableOpacity>
    );
};