import React from 'react';
import { View, Text } from 'react-native';

const Message = ({ color, children }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: color || '#DB0000' }]}>
        {children}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    alignSelf: 'center',
    width: 250,
    height: 65,
    marginTop: 40,
    marginBottom: 40,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
  }
};

export default Message;
