import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

class ConfirmationModal extends Component {
  render() {
    const { isVisible, onConfirmPress, onCancelPress, text } = this.props;

    return (
      <Modal isVisible={isVisible}>
        <Card containerStyle={{ opacity: 0.9 }}>
          <Text style={styles.text}>
            {text}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              raised
              title='Confirm'
              icon={{ name: 'done' }}
              onPress={onConfirmPress}
              buttonStyle={styles.button}
              fontSize={13}
              borderRadius={30}
              backgroundColor='#98250B'
            />
            <Button
              raised
              title='Cancel'
              icon={{ name: 'clear' }}
              onPress={onCancelPress}
              buttonStyle={styles.button}
              fontSize={13}
              borderRadius={30}
              backgroundColor='#D13310'
            />
          </View>
        </Card>
      </Modal>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(0, 0, 0, 0.7)'
  },
  text: {
    color: '#F26C4F',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    // height: 50,
  },
  button: {
    width: 110,
    marginBottom: 10,
    height: 44,
  },
};

export default ConfirmationModal;
