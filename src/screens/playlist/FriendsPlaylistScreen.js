import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import YouTube from 'react-native-youtube';
import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { getSongsInPlaylist } from '../../actions';
import Message from '../../components/Message';
import Spinner from '../../components/Spinner';
import SongsInPlaylistList from '../../components/SongsInPlaylistList';

class FriendsPlaylistScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.playlist.title,
    headerLeft: <Text>Done</Text>
  });

  componentDidMount() {
    const { getSongsInPlaylist, user, authToken, navigation } = this.props;
    const { playlist } = navigation.state.params;

    getSongsInPlaylist(playlist._id, authToken);
  }

  renderSpinner = () => {
    const { songsInPlaylist, awaitingSongsInPlaylist } = this.props;

    if ((_.isNull(songsInPlaylist) || songsInPlaylist === undefined) && awaitingSongsInPlaylist) {
      return <Spinner size='large'/>;
    }
  };

  render() {
    const { navigation } = this.props;
    const { playlist, awaitingSongsInPlaylist, songsInPlaylist } = navigation.state.params;

    // this.renderSpinner();
    if ((_.isNull(songsInPlaylist) || songsInPlaylist === undefined) && awaitingSongsInPlaylist) {
      return <Spinner size='large'/>;
    }

    return (
      <View style={styles.buttonContainer}>
        <Button
          // raised
          title='Add Songs'
          icon={{ name: 'add-circle-outline' }}
          onPress={() => navigation.navigate('addSongs', { playlist })}
          style={styles.button}
          disabledStyle={styles.buttonDisabled}
          // disabled={awaitingSongsInPlaylist}
          fontSize={13}
          borderRadius={60}
          backgroundColor='#98250B'
        />
        <Button
          // raised
          title='Delete Songs'
          icon={{ name: 'clear' }}
          onPress={() => null}
          style={styles.button}
          disabledStyle={styles.buttonDisabled}
          // disabled={awaitingSongsInPlaylist}
          fontSize={13}
          borderRadius={60}
          backgroundColor='#D13310'
        />
        <SongsInPlaylistList data={songsInPlaylist}/>
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
  playlist: { awaitingSongsInPlaylist, songsInPlaylist, songsInPlaylistError }
}) => {
  return {
    authToken,
    awaitingSongsInPlaylist,
    songsInPlaylist,
    songsInPlaylistError,
  };
};

export default connect(mapStateToProps, { getSongsInPlaylist })(FriendsPlaylistScreen);
