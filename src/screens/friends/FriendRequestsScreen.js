import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getFriendRequests } from '../../actions';
import { Icon } from 'react-native-elements';

import FriendsList from '../../components/FriendsList';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import BackgroundImage from '../../components/BackgroundImage';

class FriendRequestsScreen extends Component {
  static navigationOptions = {
    title: 'Requests',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        type='material-community'
        name='account-alert'
        color={tintColor}
      />
    ),
  };

  componentWillReceiveProps(nextProps) {
    const { getFriendRequests, authToken, currentRoute } = this.props;
    if (currentRoute !== nextProps.currentRoute && nextProps.currentRoute === 'friendRequests') {
      getFriendRequests(authToken);
    }
  }

  renderSpinner() {
    const { friendRequests, awaitingFriendRequests } = this.props;

    if ((friendRequests === null || friendRequests === undefined) && awaitingFriendRequests) {
      return <Spinner size='large'/>;
    }
  }

  renderMessage = () => {
    const { friendRequests, friendRequestsError, awaitingFriendRequests } = this.props;
    if (!awaitingFriendRequests && friendRequests && friendRequests.length === 0) {
      return (
        <Message
          text=""
          color='#F26C4F'
        >
          You don't have any friend requests.
        </Message>
      );
    } else if (friendRequestsError) {
      return (
        <Message
          text={friendRequestsError}
        />
      );
    }
  };

  render() {
    let data;
     if (this.props.friendRequests) {
       data = this.props.friendRequests.map(obj => {
         return {
           ...obj.user,
           dateReceived: obj.dateReceived
         };
       });
     }

    return (
      <BackgroundImage>
        <FriendsList
          data={data}
          navigation={this.props.navigation}
          subtitle='xyz'
        />
        {this.renderMessage()}
        {this.renderSpinner()}
      </BackgroundImage>
    );
  }
};

const getCurrentRouteRecursive = (routes, index) => {
  const route = routes[index];
  if (route.index === undefined) {
    return route.routeName;
  } else {
    return getCurrentRouteRecursive(route.routes, route.index);
  }
};

const mapStateToProps = ({
  nav,
  friends: { friendRequests, friendRequestsError, awaitingFriendRequests },
  auth: { authToken },
}) => {
  const currentRoute = getCurrentRouteRecursive(nav.routes, nav.index);
  return {
    friendRequests,
    friendRequestsError,
    awaitingFriendRequests,
    authToken,
    currentRoute,
  };
};

export default connect(mapStateToProps, { getFriendRequests })(FriendRequestsScreen);
