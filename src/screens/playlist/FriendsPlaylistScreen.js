import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import YouTube from 'react-native-youtube';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSongsInFriendsPlaylist, deleteSong } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import SongsInFriendsPlaylistList from '../../components/SongsInFriendsPlaylistList';

class FriendsPlaylistScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.playlist.title,
    headerLeft: <Text>Done</Text>
  });

  state = {
    sortedBy: 'addedOnDesc',
  };

  componentDidMount() {
    const { getSongsInFriendsPlaylist, user, authToken, navigation } = this.props;
    const { playlist } = navigation.state.params;

    getSongsInFriendsPlaylist(playlist._id, authToken);
  }

  sortData = data => {
    if (!data) {
      return data;
    }

    const { sortedBy } = this.state;

    switch (sortedBy) {
      case 'addedOnAsc':
        return _.sortBy(data, 'dateAdded');
      case 'addedOnDesc':
        return _.sortBy(data, 'dateAdded').reverse();
      case 'titleAsc':
        return _.sortBy(data, 'title');
      case 'titleDesc':
        return _.sortBy(data, 'title').reverse();
    }
  };

  renderSpinner = () => {
    const { songsInFriendsPlaylist, awaitingSongsInFriendsPlaylist } = this.props;

    if ((_.isNull(songsInFriendsPlaylist) || songsInFriendsPlaylist === undefined) && awaitingSongsInFriendsPlaylist) {
      return <Spinner size='large'/>;
    }
  };

  render() {
    const { navigation, awaitingSongsInFriendsPlaylist, songsInFriendsPlaylist } = this.props;
    const { playlist } = navigation.state.params;

    // this.renderSpinner();
    if (awaitingSongsInFriendsPlaylist) {
      return <Spinner size='large'/>;
    }

    // if (songsInFriendsPlaylist && songsInFriendsPlaylist.length === 0) {
    //   return <Message color='#F26C4F'>The playlist is empty.</Message>
    // }

    return (
      <View>
        <View style={styles.buttonContainer}>
          <Button
            // raised
            title='Add Songs'
            icon={{ name: 'add-circle-outline' }}
            onPress={() => navigation.navigate('addSongs', { playlist })}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            // disabled={awaitingSongsInFriendsPlaylist}
            fontSize={13}
            borderRadius={60}
            backgroundColor='#98250B'
          />
          {/* <Button
            // raised
            title='Delete Songs'
            icon={{ name: 'clear' }}
            onPress={() => null}
            style={styles.button}
            disabledStyle={styles.buttonDisabled}
            // disabled={awaitingSongsInFriendsPlaylist}
            fontSize={13}
            borderRadius={60}
            backgroundColor='#D13310'
          /> */}
        </View>
        <SongsInFriendsPlaylistList data={this.sortData(songsInFriendsPlaylist)} navigation={navigation} />
      </View>
    );
  }
};

const styles = {
  textAndImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    borderRadius: 30,
    height: 60,
    width: 60,
    marginBottom: 8,
  },
  text: {
    // fontSize: 19,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 140,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: '#98250B',
  },
};

const mapStateToProps = ({
  auth: { authToken },
  playlist: { awaitingSongsInFriendsPlaylist, songsInFriendsPlaylist, songsInFriendsPlaylistError }
}) => {
  return {
    authToken,
    awaitingSongsInFriendsPlaylist,
    songsInFriendsPlaylist,
    songsInFriendsPlaylistError,
  };
};

export default connect(mapStateToProps, { getSongsInFriendsPlaylist, deleteSong })(FriendsPlaylistScreen);
