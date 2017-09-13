import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import SortPlaylistButtonGroup from './SortPlaylistButtonGroup';

class SortPlaylistModal extends Component {
  state = {};

  render() {
    const { isVisible, sortedBy, onButtonGroupPress, onDoneButtonPress } = this.props;

    return (
      // <View style={styles.container}>
        <Modal isVisible={isVisible}>
          <Card containerStyle={{ opacity: 0.8 }}>
            <SortPlaylistButtonGroup sortedBy={sortedBy} onPress={onButtonGroupPress} />
            <View style={styles.buttonContainer}>
              <Button
                raised
                title='Done'
                icon={{ name: 'done' }}
                onPress={onDoneButtonPress}
                style={styles.button}
                disabledStyle={styles.buttonDisabled}
                fontSize={13}
                borderRadius={30}
                backgroundColor='#98250B'
              />
            </View>
          </Card>
        </Modal>
      // </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: -40,
    height: 50,
  },
  button: {
    width: 140,
  },
};

export default SortPlaylistModal;
