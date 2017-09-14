import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import UserScreen from '../../screens/UserScreen';
import FriendRequestsScreen from '../../screens/friends/FriendRequestsScreen';

const FriendRequestsStackNav = StackNavigator({
  friendRequests: {
    screen: FriendRequestsScreen,
    navigationOptions: {
      title: 'Friend Requests'
    }
  },
  user: { screen: UserScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='account-alert'
        color={tintColor}
      />
    ),
  }
});

export default FriendRequestsStackNav;
