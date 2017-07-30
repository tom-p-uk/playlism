import React from 'react';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

const BackButton = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.goBack()}>
      <Icon name='keyboard-arrow-left' color={props.color}/>
    </TouchableOpacity>
  );
};

export default BackButton;
