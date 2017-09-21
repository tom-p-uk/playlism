import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class DrawerButton extends Component {
  render() {
    const { navigation, tintColor } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DrawerOpen')}
        style={styles.opacity}
      >
        <Icon
          type='material-community'
          name="menu"
          color={tintColor}
        />
      </TouchableOpacity>
    );
  }
};

const styles = {
  opacity: {
    paddingRight: 10,
  }
};
export default DrawerButton;
