import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

class SpinnerOverlay extends Component {

  state = { visible: true };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: false,
      });
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textStyle={{color: '#FFFFFF'}} overlayColor='#F26C4F' />
      </View>
    );
  }
}

export default SpinnerOverlay;
