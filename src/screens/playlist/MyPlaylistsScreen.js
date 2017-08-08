import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getMyPlaylists } from '../../actions';
// import FriendsList from '../../components/FriendsList';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';

class MyPlaylistsScreen extends Component {
  static navigationOptions = {
    title: 'My Playlists',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // style={styles.icon}
        type='material-community'
        name='playlist-play'
        color={tintColor}
      />
    ),
  };

  componentDidMount() {
    const { getMyPlaylists, user, authToken, navigation, awaitingMyPlaylists } = this.props;
    getMyPlaylists(authToken);

  }

  renderSpinner() {
    const { myPlaylists, awaitingMyPlaylists } = this.props;

    if ((_.isNull(myPlaylists) || myPlaylists === undefined) && awaitingMyPlaylists) {
      return <Spinner size='large'/>;
    }
  }

  renderMessage = () => {
    const { myPlaylists, myPlaylistsError, awaitingMyPlaylists } = this.props;
    if (!awaitingMyPlaylists && myPlaylists && myPlaylists.length === 0) {
      return (
        <Message
          text=""
          color='#F26C4F'
        >
          You don't have any playlists yet.{'\n'}
        </Message>
      );
    } else if (myPlaylistsError) {
      return (
        <Message
          text={myPlaylistsError}
        />
      );
    }
  };

  render() {
    return (
      <View>
        {this.renderMessage()}
        {this.renderSpinner()}
      </View>
    );
  }
};

const mapStateToProps = state => {
  const { playlist: { myPlaylists, myPlaylistsError, awaitingMyPlaylists } , auth: { user, authToken } } = state;

  return {
    myPlaylists,
    myPlaylistsError,
    awaitingMyPlaylists,
    user,
    authToken,
  };
};

export default connect(mapStateToProps, { getMyPlaylists })(MyPlaylistsScreen);
