import React from 'react';
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import UserScreen from '../screens/UserScreen';
import SearchFriendScreen from '../screens/friends/SearchFriendScreen';

const AddFriendStackNav = StackNavigator({
  searchFriends: {
    screen: SearchFriendScreen,
    navigationOptions: {
      title: 'Search Friends'
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
        name='account-plus'
        color={tintColor}
      />
    ),
  }
});

export default AddFriendStackNav;
