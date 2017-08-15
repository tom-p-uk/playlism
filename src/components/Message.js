import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const Message = ({ color, children }) => {
  return (
    <Card>
      <View style={styles.container}>
        <Text style={[styles.text, { color: color || '#DB0000' }]}>
          {children}
        </Text>
      </View>
    </Card>
  );
};

const styles = {
  container: {
    alignSelf: 'center',
    width: 250,
    // height: 65,
    marginTop: 40,
    marginBottom: 40,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
  }
};

export default Message;
