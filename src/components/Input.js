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
        onChangeText={value => onChange(value)}
        value={value}
        {...otherProps}
      />
      {touched && error &&
        <View style={styles.errorContainer}>
          <Icon name='error' color='#98250B'/>
          <Text style={styles.errorText}>{error}</Text>
        </View>}
    </View>
  );
};

const styles = {
  // inputContainer: {
  //   height: 40,
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderBottomWidth: 1,
  //   borderColor: '#ddd',
  // },
  // InputText: {
  //   color: '#000',
  //   paddingRight: 5,
  //   paddingLeft: 5,
  //   fontSize: 18,
  //   lineHeight: 23,
  //   flex: 2,
  // },
  errorContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: '#98250B',
  },
};

export default Input;
