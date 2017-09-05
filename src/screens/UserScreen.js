import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import BackButton from '../components/BackButton';
import UserCard from '../components/UserCard';
import {
  checkUserFriendStatus,
  sendFriendRequest,
  loadFriendRequestsSent,
  respondToFriendRequest,
  deleteFriend,
} from '../actions';

class UserScreen extends Component {
  static navigationOptions = ({ navigation, tintColor }) => ({
    title: navigation.state.params.user.displayName,
    headerLeft: <BackButton color='#FFFFFF' navigation={navigation} />
  });

  componentDidMount() {
    const { friends, loadFriendRequestsSent, loggedInUser, friendRequests, friendRequestsSent, checkUserFriendStatus } = this.props;
    const { user } = this.props.navigation.state.params;

    loadFriendRequestsSent(loggedInUser.friendRequestsSent);
    checkUserFriendStatus(user, friends, friendRequests, friendRequestsSent);
  }

  componentWillReceiveProps(nextProps) {
    const { friends, friendRequests, friendRequestsSent } = nextProps;
    const { user } = this.props.navigation.state.params;

    this.props.checkUserFriendStatus(user, friends, friendRequests, friendRequestsSent);
  }

  returnButtonProps = () => {
    const {
      userFriendStatus,
      awaitingSendFriendRequest,
      sendFriendRequest,
      respondToFriendRequest,
      authToken,
      friends,
      friendRequests,
      awaitingRespondToFriendRequest,
      navigation,
    } = this.props;
    const { user } = this.props.navigation.state.params;

    if (userFriendStatus === 'notFriends') {
      return {
        icon: { name: 'account-plus', type: 'material-community' },
        title: 'Send Friend Request',
        disabled: awaitingSendFriendRequest,
        // loading: awaitingSendFriendRequest,
        onPress: () => sendFriendRequest(user._id, authToken),
      };
    } else if (userFriendStatus === 'friendRequestSent') {
      return {
        icon: { name: 'done' },
        title: 'Friend Request Sent',
        disabled: true,
      };
    } else if (userFriendStatus === 'friendRequestReceived') {
      return {
        icon: { name: 'done' },
        title: 'Accept Friend Request',
        disabled: awaitingRespondToFriendRequest,
        // loading: awaitingRespondToFriendRequest,
        onPress: () => respondToFriendRequest(user, friends, friendRequests, authToken, true)
      };
    } else {
      return {
        icon: { name: 'playlist-plus', type: 'material-community' },
        title: `Create Playlist for ${user.firstName}`,
        onPress: () => navigation.navigate('createPlaylistForm', { user })
      };
    }
  };

  returnSecondButtonProps = () => {
    const {
      userFriendStatus,
      awaitingRespondToFriendRequest,
      authToken,
      respondToFriendRequest,
      friends,
      friendRequests,
      deleteFriend,
      awaitingDeleteFriend,
    } = this.props;
    const { user } = this.props.navigation.state.params;

    if (userFriendStatus === 'friendRequestReceived') {
      return {
        icon: { name: 'block' },
        title: 'Reject Friend Request',
        disabled: awaitingRespondToFriendRequest,
        // loading: awaitingRespondToFriendRequest,
        onPress: () => respondToFriendRequest(user, friends, friendRequests, authToken),
        backgroundColor: '#D13310',
      };
    } else if (userFriendStatus === 'friends') {
      return {
        icon: { name: 'clear' },
        title: "Delete Friend",
        disabled: awaitingDeleteFriend,
        // loading: awaitingDeleteFriend,
        onPress: () => deleteFriend(user._id, authToken),
        backgroundColor: '#D13310',
      };
    }
  };

  render() {
    const { user } = this.props.navigation.state.params;
    const { userFriendStatus } = this.props;
    const showSecondButton = (userFriendStatus === 'friends' || userFriendStatus === 'friendRequestReceived') ? true : false;

    return (
      <View>
        <UserCard
          user={user}
          coverImgSource={require('../../assets/img/vinyl-records.png')}
          buttonProps={this.returnButtonProps()}
          showSecondButton={showSecondButton}
          secondButtonProps={this.returnSecondButtonProps()}
        />
      </View>
    );
  }
};

const mapStateToProps = ({
  friends: {
    friends,
    userFriendStatus,
    awaitingSendFriendRequest,
    friendRequestsSent,
    friendRequests,
    awaitingRespondToFriendRequest,
    awaitingDeleteFriend,
  },
  auth: { authToken, user },
}) => {
  return {
    friends,
    userFriendStatus,
    awaitingSendFriendRequest,
    authToken,
    friendRequestsSent,
    friendRequests,
    awaitingRespondToFriendRequest,
    awaitingDeleteFriend,
    loggedInUser: user,
  };
};

export default connect(mapStateToProps, {
  checkUserFriendStatus,
  sendFriendRequest,
  loadFriendRequestsSent,
  respondToFriendRequest,
  deleteFriend,
})(UserScreen);
