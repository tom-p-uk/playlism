import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

const SpinnerOverlay = ({ visible }) => {
  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={true || visible} textStyle={{color: '#FFFFFF'}} overlayColor='#F26C4F' />
    </View>
  );
}

export default SpinnerOverlay;
