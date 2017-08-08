import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import UserScreen from '../screens/UserScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';

const FriendsStackNav = StackNavigator({
  friends: {
    screen: FriendsScreen,
    navigationOptions: {
      title: 'Friends'
    }
  },
  user: { screen: UserScreen },
}, {
  headerMode: 'none',
  lazy: true,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='account-multiple'
        color={tintColor}
      />
    ),
  }
});

export default FriendsStackNav;
