import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Modal from 'react-native-modal';
import YouTube from 'react-native-youtube';
import { Button } from 'react-native-elements';

class PreviewSongModal extends Component {
  render() {
    const { isVisible, videoId, onButtonPress } = this.props;
    return (
      <Modal isVisible={isVisible}>
        <View style={{ flex: 1 }} />
        <View style={styles.webViewContainer}>
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${videoId}?
                    version=3&fs=0&origin=https%3A%2F%2Fplaylism.herokuapp.com
                    &playsinline=1&enablejsapi=1&rel=0&autoplay=1
                    &showinfo=0&controls=1&modestbranding=1`,
              headers: { Referer: 'https://www.youtube.com' }
            }}
            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}
            javaScriptEnabled={true}
            allowsInlineMediaPlayback={true}
          />
        </View>
        <View style={styles.buttonOuterContainer}>
          <View style={styles.buttonContainer}>
            <Button
              raised
              title='Close'
              icon={{ name: 'clear' }}
              onPress={onButtonPress}
              style={styles.button}
              disabledStyle={styles.buttonDisabled}
              fontSize={13}
              borderRadius={30}
              backgroundColor='#98250B'
            />
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = {
  webViewContainer: {
    flex: 2,
  },
  buttonOuterContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  button: {
    width: 140,
  },
};

export default PreviewSongModal;
