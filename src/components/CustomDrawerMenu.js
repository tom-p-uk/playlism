import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class CustomDrawerMenu extends Component {
  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.profileImgContainer}>
          <View>
            <Image source={{ uri: decodeURIComponent(user.profileImg) }} style={styles.profileImg} />
          </View>
          <Text style={styles.displayName}>
            {user.displayName}
          </Text>
        </View>
        <View
          style={styles.divider}
        />
        {/* <Divider style={{ backgroundColor: '#F26C4F' }} /> */}
        <DrawerItems style={styles.items} {...this.props} />
        {/* <TouchableOpacity>
          <Text>Logout</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
};

const styles = {
  container: {
    // flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#F26C4F'
  },
  profileImgContainer: {
    // backgroundColor: '#E9F2F9',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 60,
    // flex: 1
  },
  profileImg: {
    borderRadius: 40,
    height: 80,
    width: 80,
  },
  displayName: {
    color: '#000000',
    fontSize: 17,
    marginTop: 10
  },
  divider: {
    borderBottomColor: '#F26C4F',
    borderBottomWidth: 1,
    width: SCREEN_WIDTH * 0.2,
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
  items: {
    paddingTop: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  }
};

const mapStateToProps = ({ auth: { user } }) => {
  return { user };
};

export default connect(mapStateToProps)(CustomDrawerMenu);
