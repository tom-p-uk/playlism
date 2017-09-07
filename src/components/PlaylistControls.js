import React from 'react';
import { View } from 'react-native';
import { Card, Button } from 'react-native-elements';

const PlaylistControls = ({ firstButtonProps, secondButtonProps }) => {
  return (
    <Card containerStyle={styles.buttonCard}>
      <View style={styles.buttonContainer}>
        <Button
          raised
          small
          title={firstButtonProps.title}
          icon={{ name: firstButtonProps.iconName, style: styles.buttonIcon }}
          onPress={firstButtonProps.onPress}
          style={styles.button}
          disabledStyle={styles.buttonDisabled}
          fontSize={12}
          borderRadius={30}
          backgroundColor='#98250B'
        />
        <Button
          raised
          small
          title={secondButtonProps.title}
          icon={{ name: secondButtonProps.iconName, style: styles.buttonIcon }}
          onPress={secondButtonProps.onPress}
          style={styles.button}
          disabledStyle={styles.buttonDisabled}
          fontSize={12}
          borderRadius={30}
          backgroundColor='#D13310'
        />
      </View>
    </Card>
  );
};

const styles = {
  buttonCard: {
    opacity: 0.8,
    marginTop: 20,
    marginBottom: 0,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonIcon: {
    marginRight: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: -40,
    height: 50,
  },
  button: {
    // width: 115,
    // opacity: 0.9,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

export default PlaylistControls;
