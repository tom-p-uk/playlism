import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import TextField from 'react-native-md-textinput';

const Input = props => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    placeholder,
    secureTextEntry,
    label,
    highlightColor,
    ...otherProps
  } = props;

  return (
    <View>
      <TextField
        label={label}
        highlightColor={highlightColor}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        onChangeText={text => onChange(text)}
        value={value}
        {...otherProps}
      />
      {touched && error &&
        <View style={styles.errorContainer}>
          <Icon name='error' color='#98250B' />
          <Text style={styles.errorText}>{error}</Text>
        </View>}
    </View>
  );
};

const styles = {
  errorContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: '#98250B',
  },
};

export default Input;
