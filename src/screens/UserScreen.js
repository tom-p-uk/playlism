import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import BackButton from '../components/BackButton';
import UserCard from '../components/UserCard';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  checkUserFriendStatus,
  sendFriendRequest,
  loadFriendRequestsSent,
  respondToFriendRequest,
  deleteFriend,
} from '../actions';

class UserScreen extends Component {
  state = {
    isConfirmationModalVisible: false,
  };

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

  toggleConfirmationModal = () => this.setState({ isConfirmationModalVisible: !this.state.isConfirmationModalVisible });

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
        icon: awaitingSendFriendRequest ? null : { name: 'account-plus', type: 'material-community' },
        title: 'Send Friend Request',
        disabled: awaitingSendFriendRequest,
        loading: awaitingSendFriendRequest,
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
        icon: awaitingRespondToFriendRequest ? null : { name: 'done' },
        title: 'Accept Friend Request',
        disabled: awaitingRespondToFriendRequest,
        loading: awaitingRespondToFriendRequest,
        onPress: () => respondToFriendRequest(user, friends, friendRequests, authToken, true)
      };
    } else {
      return {
        icon: { name: 'playlist-plus', type: 'material-community' },
        title: 'Create Playlist',
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
      awaitingDeleteFriend,
    } = this.props;
    const { user } = this.props.navigation.state.params;

    if (userFriendStatus === 'friendRequestReceived') {
      return {
        icon: awaitingRespondToFriendRequest ? null : { name: 'block' },
        title: 'Reject Friend Request',
        disabled: awaitingRespondToFriendRequest,
        loading: awaitingRespondToFriendRequest,
        onPress: () => respondToFriendRequest(user, friends, friendRequests, authToken),
        backgroundColor: '#D13310',
      };
    } else if (userFriendStatus === 'friends') {
      return {
        icon: awaitingDeleteFriend ? null : { name: 'clear' },
        title: "Delete Friend",
        disabled: awaitingDeleteFriend,
        loading: awaitingDeleteFriend,
        onPress: this.toggleConfirmationModal,
        backgroundColor: '#D13310',
      };
    }
  };

  onConfirmDeleteFriend = () => {
    const { authToken, deleteFriend, navigation, } = this.props;
    const { user } = this.props.navigation.state.params;
    deleteFriend(user._id, authToken);
    navigation.goBack();
    this.toggleConfirmationModal();
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
        <ConfirmationModal
          isVisible={this.state.isConfirmationModalVisible}
          onConfirmPress={this.onConfirmDeleteFriend}
          onCancelPress={this.toggleConfirmationModal}
          text={'Are you sure you want to delete this friend?'}
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
