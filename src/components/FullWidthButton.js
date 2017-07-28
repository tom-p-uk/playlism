import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window');

class FullWidthButton extends Component {
  static defaultProps = {
    onPress: () => {}
  };

  render() {
    const { type, name, color, label, backgroundColor, onPress } = this.props;

    return (
      <View style={[{ backgroundColor }, styles.opacityContainer]}>
        <TouchableOpacity
          style={styles.opacity}
          activeOpacity={0.1}
          onPress={onPress}
        >
          <Icon
            style={styles.icon}
            type={type}
            name={name}
            color={color || "#FFFFFF"}
          />
          <Text style={styles.label}>
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = {
  opacityContainer: {
    flex: 1,
    marginTop: -1,
  },
  opacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  icon: {
    margin: 5,
  },
  label: {
    color: 'white',
    fontSize: 18
  },
};

export default FullWidthButton;
