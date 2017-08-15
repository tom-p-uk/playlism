import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import YouTube from 'react-native-youtube';
import SortPlaylistButtonGroup from './SortPlaylistButtonGroup';

class SortPlaylistModal extends Component {
  state = {};

  render() {
    const { isVisible, sortedBy, onButtonGroupPress, onDoneButtonPress } = this.props;

    return (
      <Modal isVisible={isVisible}>
        <Card>
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
    );
  }
};

const styles = {
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
