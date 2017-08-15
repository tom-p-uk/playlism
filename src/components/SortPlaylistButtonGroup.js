import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ButtonGroup, Button, Icon } from 'react-native-elements';

class SortPlaylistButtonGroup extends Component {
  render() {
    const { sortedBy, onPress } = this.props;

    const titleAsc = () => (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Icon name='keyboard-arrow-up' style={{  }}/>
        <Text style={styles.text}>Title</Text>
      </View>
    );
    const titleDesc = () => (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Icon name='keyboard-arrow-down' style={{  }}/>
        <Text style={styles.text}>Title</Text>
      </View>
    );

    const dateAsc = () => (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Icon name='keyboard-arrow-up' style={{  }}/>
        <Text style={styles.text}>Date</Text>
      </View>
    );
    const dateDesc = () => (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Icon name='keyboard-arrow-down' style={{  }}/>
        <Text style={styles.text}>Date</Text>
      </View>
    );

    const buttons = [{ element: dateAsc }, { element: titleDesc }, { element: dateAsc }, { element: dateDesc }];
    const buttonss = ['↑ Date', '↓ Date', '↑ Title', '↓ Title'];
    return (
      <ButtonGroup
        onPress={index => onPress(index)}
        selectedIndex={sortedBy}
        buttons={buttonss}
        containerStyle={{height: 40}}
        // selectedBackgroundColor='#F26C4F'
        selectedTextStyle={{ color: '#F26C4F' }}
      />
    )
  }
};

const styles = {
  text: {
    fontSize: 9,
  },
};

export default SortPlaylistButtonGroup;
