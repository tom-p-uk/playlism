import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
// import styles from './Styles/DrawerButtonStyles';

class DrawerButton extends Component {
  render() {
    const { navigation, tintColor } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DrawerOpen')}
        style={styles.button}
      >
        <Icon
          type='material-community'
          name="menu"
          color={tintColor}
          // style={styles.iconStyle}
        />
      </TouchableOpacity>
    );
  }
};

const styles = {
  button: {
    paddingRight: 10,
  }
};
export default DrawerButton;
