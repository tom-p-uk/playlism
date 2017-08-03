import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Hamburger from '../components/Hamburger';
import { updateLastLogin } from '../actions';
import FullWidthButton from '../components/FullWidthButton';

const SCREEN_WIDTH = Dimensions.get('window');

class DashboardScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='home'
        color={tintColor}
      />
    ),
  };

  render() {
    const { user, drawerIsOpen } = this.props;
    if (!user) return <View />
    return (
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          {/* <Hamburger
            active={drawerIsOpen}
            onPress={this.onHamburgerPress}
          /> */}
          <View>
            <Image source={{ uri: decodeURIComponent(user.profileImg) }} style={styles.profileImg} />
          </View>
          <Text style={styles.displayName}>
            {user.displayName}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          {/* <Button
            style={styles.buttons}
            // raised
            fontSize={15}
            title="  Songs  "
            icon={{ name: 'play', type: 'font-awesome' }}
            backgroundColor="#1B325F"
            onPress={() => {}}
            // borderRadius={6}
          /> */}
          <FullWidthButton
            type='font-awesome'
            name='music'
            label='  Songs  '
            backgroundColor='#1B325F'
          />
          <FullWidthButton
            type='material-community'
            name='playlist-play'
            label='Playlists'
            backgroundColor='#3A89C9'
          />
          <FullWidthButton
            type='material-community'
            name='account-multiple'
            label=' Friends '
            backgroundColor='#9CC4E4'
            onPress={() => this.props.navigation.navigate('addFriend')}
          />
          {/* <Button
            style={styles.buttons}
            // raised
            fontSize={15}
            title="Playlists"
            icon={{ name: 'playlist-play', type: 'material-community' }}
            backgroundColor="#3A89C9"
            onPress={() => {}}
            // borderRadius={6}
          /> */}
          {/* <Button
            style={styles.buttons}
            // raised
            fontSize={15}
            title=" Friends "
            icon={{ name: 'account-multiple', type: 'material-community' }}
            backgroundColor="#9CC4E4"
            onPress={() => {}}
            // borderRadius={6}
          /> */}
        </View>
      </View>
    )
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  profileImgContainer: {
    backgroundColor: '#E9F2F9',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1
  },
  profileImg: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  displayName: {
    color: '#000000',
    fontSize: 19,
    // margin: 30
  },
  songsButton: {

  },
  playlistsButton: {

  },
  friendsButton: {

  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  buttons: {
    // // width: SCREEN_WIDTH,
    // flex: 1
    alignSelf: 'stretch'
  },
  opacityContainer: {
    flex: 1
  },
  opacity: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B325F',
    flex: 1
  },
  opacityText: {
    color: 'white'
  },
};

const mapStateToProps = ({ auth: { user } }) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(DashboardScreen);
