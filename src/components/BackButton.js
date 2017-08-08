import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const BackButton = ({ navigation, color }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={styles.opacity}
    >
      <Icon name='keyboard-arrow-left' color={color}/>
    </TouchableOpacity>
  );
};

const styles = {
  opacity: {
    padding: 15,
  },
};
export default BackButton;
