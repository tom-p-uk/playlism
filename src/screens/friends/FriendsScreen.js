import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { getFriends, loadFriendRequestsSent } from '../../actions';
import FriendsList from '../../components/FriendsList';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';

class FriendsScreen extends Component {
  static navigationOptions = {
    title: 'Friends',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='account-multiple'
        color={tintColor}
      />
    ),
  };

  componentDidMount() {
    const { getFriends, user, authToken, navigation, loadFriendRequestsSent } = this.props;
    getFriends(authToken);
  }

  renderSelectFriendText = () => {
    const { routeName } = this.props.navigation.state;
    const { friends, friendsError, awaitingFriends } = this.props;
    if (!awaitingFriends && friends && friends.length !== 0 && routeName === 'selectFriend') {
      return (
        <Text style={styles.selectFriendMessage}>
          Select a user from your friends list.
        </Text>

      );
    }
  };

  renderSpinner = () => {
    const { friends, awaitingFriends } = this.props;

    if ((_.isNull(friends) || friends === undefined) && awaitingFriends) {
      return <Spinner size='large'/>;
    }
  };

  renderMessage = () => {
    const { friends, friendsError, awaitingFriends } = this.props;
    if (!awaitingFriends && friends && friends.length === 0) {
      return (
        <Message
          text=""
          color='#F26C4F'
        >
          You currently have no friends.{'\n'}
          Check the 'Search Friends' tab to add some.
        </Message>
      );
    } else if (friendsError) {
      return (
        <Message
          text={friendsError}
        />
      );
    }
  };

  render() {
    let data;
     if (this.props.friends) {
       data = this.props.friends.map(obj => {
         return {
           ...obj.user,
           friendsSince: obj.friendsSince
         };
       });
     }

    return (
      <View>
        {this.renderSelectFriendText()}
        <FriendsList
          data={data}
          navigation={this.props.navigation}
          // renderHeader=
        />
        {this.renderMessage()}
        {this.renderSpinner()}
      </View>
    );
  }
};

const styles = {
  selectFriendMessage: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#F26C4F',
    marginTop: 20,
  },
};

const mapStateToProps = ({ friends: { friends, friendsError, awaitingFriends }, auth: { user, authToken } }) => {
  return {
    friends,
    friendsError,
    awaitingFriends,
    user,
    authToken,
  };
};

export default connect(mapStateToProps, { getFriends, loadFriendRequestsSent })(FriendsScreen);
