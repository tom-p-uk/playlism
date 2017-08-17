import React from 'react';
import { Image, View } from 'react-native';

const styles = {
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
  },
  overlay: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   backgroundColor: 'rgba(40,40,40, 0.7)'
  },
};

const BackgroundImage = ({ source, children }) => {
  return (
    <Image source={source || require('../../assets/img/record-box.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay} />
      {children}
    </Image>
  );
};

export default BackgroundImage;
