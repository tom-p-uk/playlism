import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import BackButton from '../../components/BackButton';
import UserCard from '../../components/UserCard';
import { checkUserFriendStatus, sendFriendRequest, loadFriendRequestsSent } from '../../actions';

class AddFriendUserScreen extends Component {
  static navigationOptions = ({ navigation, tintColor }) => ({
    title: navigation.state.params.user.displayName,
    headerLeft: <BackButton color='#FFFFFF' navigation={navigation} />
  });

  componentDidMount() {
    const {
      friends, loadFriendRequestsSent, loggedInUser, friendRequests, friendRequestsSent, checkUserFriendStatus } = this.props;
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
    const { userFriendStatus, awaitingSendFriendRequest, sendFriendRequest, authToken } = this.props;
    const { user } = this.props.navigation.state.params;

    if (userFriendStatus === 'notFriends') {
      return {
        icon: !awaitingSendFriendRequest && { name: 'account-plus', type: 'material-community' },
        title: 'Send Friend Request',
        disabled: awaitingSendFriendRequest,
        loading: awaitingSendFriendRequest,
        onPress: () => sendFriendRequest(user._id, authToken),
      };
    } else if (userFriendStatus === 'friendRequestSent') {
      return {
        icon: { name: 'paper-plane', type: 'entypo' },
        title: 'Friend Request Sent',
        disabled: true,
      };
    } else if (userFriendStatus === 'friendRequestReceived') {
      return {
        icon: { name: 'done' },
        title: 'Accept Friend Request',
        // disabled: true,
      };
    } else {
      return {
        icon: { name: 'account-multiple', type: 'material-community' },
        title: 'Friends',
        disabled: true,
      };
    }
  };

  render() {
    const { user } = this.props.navigation.state.params;

    return (
      <View>
        <UserCard
          user={user}
          coverImgSource={require('../../../assets/img/vinyl-records.png')}
          buttonProps={this.returnButtonProps()}
        />
      </View>
    );
  }
};

const mapStateToProps = state => {
  const { friends, userFriendStatus, awaitingSendFriendRequest, friendRequestsSent, friendRequests } = state.friends;
  const { authToken, user } = state.auth;

  return {
    friends,
    userFriendStatus,
    awaitingSendFriendRequest,
    authToken,
    friendRequestsSent,
    friendRequests,
    loggedInUser: user,
  };
};

export default connect(mapStateToProps, { checkUserFriendStatus, sendFriendRequest, loadFriendRequestsSent })(AddFriendUserScreen);
