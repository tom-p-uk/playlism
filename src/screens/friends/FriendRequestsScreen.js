import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getFriendRequests } from '../../actions';
import { Icon } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';

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

    if (nextProps.friendRequestsError) {
      this.dropdown.alertWithType('error', 'Error', nextProps.friendRequestsError);
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
    if (friendRequests && friendRequests.length === 0) {
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
        <Message>
          {friendRequestsError}
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
        {this.renderDropdownAlert()}
      </BackgroundImage>
    );
  }
};

const mapStateToProps = ({
  nav: { currentRoute },
  friends: { friendRequests, friendRequestsError, awaitingFriendRequests },
  auth: { authToken },
}) => {
  return {
    friendRequests,
    friendRequestsError,
    awaitingFriendRequests,
    authToken,
    currentRoute,
  };
};

export default connect(mapStateToProps, { getFriendRequests })(FriendRequestsScreen);
