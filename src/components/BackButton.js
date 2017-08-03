import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const BackButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.goBack()}
      style={styles.opacity}
    >
      <Icon name='keyboard-arrow-left' color={props.color}/>
    </TouchableOpacity>
  );
};

const styles = {
  opacity: {
    padding: 15,
  },
};
export default BackButton;
