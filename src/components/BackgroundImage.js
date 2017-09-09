import React from 'react';
import { Image, View } from 'react-native';

const BackgroundImage = ({ source, extraStyle, children }) => {
  return (
    <Image
      source={source || require('../../assets/img/stack-vinyl.jpg')}
      style={styles.backgroundImage}
    >
      <View style={[styles.overlay, extraStyle]} />
      {children}
    </Image>
  );
};

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

export default BackgroundImage;
