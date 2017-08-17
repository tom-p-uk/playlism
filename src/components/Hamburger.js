import React, { Component } from 'react';
import { View } from 'react-native';
import Hamburger from 'react-native-hamburger';
import { connect } from 'react-redux';

import * as actions from '../actions';

class HamburgerComponent extends Component {
  render() {
    const { active, onPress, color } = this.props;

    return (
      <View style={styles.container}>
        <Hamburger
          active={active}
          type="cross"
          color={color || "#FFFFFF"}
          onPress={onPress}
        />
      </View>
    );
  }
};

const styles = {
  container: {
    // flex: 1,
    // backgroundColor: '#000000'
  }
};

export default HamburgerComponent;
