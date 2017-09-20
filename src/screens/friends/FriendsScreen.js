import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import DropdownAlert from 'react-native-dropdownalert';

import { getFriends, loadFriendRequestsSent } from '../../actions';
import FriendsList from '../../components/FriendsList';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import BackgroundImage from '../../components/BackgroundImage';

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
    const { getFriends, authToken } = this.props;
    getFriends(authToken);
  }

  componentWillReceiveProps(nextProps) {
    const { getFriends, authToken, currentRoute } = this.props;
    if (currentRoute !== 'friends' && nextProps.currentRoute === 'friends') {
      getFriends(authToken);
    }

    if (!this.props.friendsError && nextProps.friendsError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.friendsError);
    }
  }

  renderSelectFriendText = () => {
    const { routeName } = this.props.navigation.state;
    const { friends, friendsError, awaitingFriends } = this.props;
    if (friends && friends.length !== 0 && routeName === 'selectFriend') {
      return (
        <Card containerStyle={styles.selectFriendMessageCard}>
          <Text style={styles.selectFriendMessage}>
            Select a user from your friends list.
          </Text>
        </Card>
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
    if (friends && friends.length === 0) {
      return (
        <Message
          text=""
          color='#F26C4F'
        >
          You currently have no friends.{'\n'}
          Check the 'Search Friends' tab to add some.
        </Message>
      );
    }
  };

  renderDropdownAlert = () => {
    return (
      <DropdownAlert
        ref={ref => this.dropdown = ref}
        errorColor='#F26C4F'
        closeInterval={2000}
        titleStyle={{ marginTop: Platform.OS === 'android' ? 0 : -20, fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' }}
      />
    );
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
      <BackgroundImage>
        {this.renderSelectFriendText()}
        <FriendsList
          data={data}
          navigation={this.props.navigation}
          // renderHeader=
        />
        {this.renderMessage()}
        {this.renderSpinner()}
        {this.renderDropdownAlert()}
      </BackgroundImage>
    );
  }
};

const styles = {
  selectFriendMessageCard: {
    opacity: 0.8,
  },
  selectFriendMessage: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#98250B',
  },
};

const mapStateToProps = ({
  nav: { currentRoute },
  friends: { friends, friendsError, awaitingFriends },
  auth: { user, authToken }
}) => {
  return {
    friends,
    friendsError,
    awaitingFriends,
    user,
    authToken,
    currentRoute,
  };
};

export default connect(mapStateToProps, { getFriends, loadFriendRequestsSent })(FriendsScreen);
