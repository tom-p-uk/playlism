import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const Message = ({ color, children }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <Text style={[styles.text, { color: color || '#DB0000' }]}>
          {children}
        </Text>
      </View>
    </Card>
  );
};

const styles = {
  card: {
    opacity: 0.8,
    // marginTop: 40,
  },
  container: {
    alignSelf: 'center',
    width: 250,
    // height: 65,
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
  }
};

export default Message;
