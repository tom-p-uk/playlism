import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import Modal from 'react-native-modal';

import { Button } from 'react-native-elements';

class PreviewSongModal extends Component {
  render() {
    const { isVisible, videoId, onButtonPress } = this.props;
    return (
      <Modal isVisible={isVisible}>
        <View style={styles.container}>
        <View style={{ flex: 1 }} />
        <View style={styles.webViewContainer}>
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${videoId}?
                    version=3&fs=0
                    &playsinline=1&enablejsapi=1&rel=0&autoplay=1
                    &showinfo=0&controls=1&modestbranding=0`,
              headers: { Referer: 'https://www.youtube.com' }
            }}
            style={styles.webView}
            javaScriptEnabled
            allowsInlineMediaPlayback
          />
        </View>
        <View style={styles.buttonOuterContainer}>
          <View style={styles.buttonContainer}>
            <Button
              raised
              title='Close'
              icon={{ name: 'clear' }}
              onPress={onButtonPress}
              buttonStyle={styles.button}
              fontSize={13}
              borderRadius={30}
              backgroundColor='#98250B'
            />
          </View>
        </View>
        </View>
      </Modal>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  webViewContainer: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  webView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  button: {
    width: 140,
    height: 44,
  },
};

export default PreviewSongModal;
