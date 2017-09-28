import React, { Component } from 'react';
import { ButtonGroup } from 'react-native-elements';

class SortPlaylistButtonGroup extends Component {
  render() {
    const { sortedBy, onPress } = this.props;

    const buttons = ['↑ Date', '↓ Date', '↑ Title', '↓ Title'];
    return (
      <ButtonGroup
        onPress={index => onPress(index)}
        selectedIndex={sortedBy}
        buttons={buttons}
        containerStyle={{ height: 40 }}
        selectedTextStyle={{ color: '#F26C4F' }}
      />
    );
  }
};

export default SortPlaylistButtonGroup;
