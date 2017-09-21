import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const LoggedInUserMsgAndPic = ({ user }) => {
  if (!user) return <View />

  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.header}>
          Welcome, {user.firstName}.
        </Text>
        <View style={styles.profileImgContainer}>
          <Image source={{ uri: decodeURIComponent(user.profileImg) }} style={styles.profileImg} />
        </View>
      </View>
    </View>
  );
};

const styles = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -SCREEN_HEIGHT,
  },
  profileImgContainer: {
    margin: 20,
  },
  profileImg: {
    borderRadius: 60,
    height: 120,
    width: 120,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
    color: '#FFFFFF'
  },
};

export default LoggedInUserMsgAndPic;
