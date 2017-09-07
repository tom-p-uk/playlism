import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Slider, Icon } from 'react-native-elements';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import {
  setPlaybackObject,
  clearPlaybackObject,
  onPlaybackStatusUpdate,
  togglePlayPause,
  toggleRepeat,
  toggleShuffle,
  scrubThroughSong,
  setCurrentlyPlayingSong,
} from '../actions';

class Player extends Component {
  state = {
    isPlayerMounted: false,
  };

  componentDidMount() {
    this.setState({ isPlayerMounted: true });
  }

  componentWillMount() {
    this.setState({ isPlayerMounted: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong) {
      this.loadSong(nextProps.currentlyPlayingSong);
    }

    if (nextProps.didJustFinish) {
      this.handleSkipNext();
    }
  }

  loadSong = async song => {
    const { playbackObject, setPlaybackObject, clearPlaybackObject, onPlaybackStatusUpdate, isPlaying } = this.props;

    if (playbackObject && playbackObject.unloadAsync) {
      await this.props.playbackObject.unloadAsync();
    }

    const source = { uri: song.localUri };
    const initialStatus = {
      volume: 1.0,
      shouldPlay: isPlaying || true,
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      onPlaybackStatusUpdate,
    );

    setPlaybackObject(sound);
  };

  skipToPosition = async positionMillis => {
    await this.props.playbackObject.setPositionAsync(positionMillis);
    this.props.scrubThroughSong(null);
  };

  togglePlayPause = async () => {
    const { playbackObject, isPlaying } = this.props;

    if (isPlaying) {
      await playbackObject.pauseAsync();
    } else {
      await playbackObject.playAsync();
    }
  };

  millisToMinsAndSecs = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    const output = (seconds == 60 ? (minutes + 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
    return (output.indexOf('NaN') === -1) ? output : ''; // To prevent 'NaN' text appearing immediately after track loads
  };

  findIndexOfSongInSongsList = (songs, song) => {
    return _.findIndex(songs, { _id: song._id });
  };

  restartSong = async () => {
    const { playbackObject } = this.props;
    await playbackObject.setPositionAsync(0);
  };

  stopSong = async () => {
    const { playbackObject } = this.props;
    await this.togglePlayPause();
    await playbackObject.setPositionAsync(0);
  };

  handleSkipPrevious = () => {
    const { songs, currentlyPlayingSong, setCurrentlyPlayingSong } = this.props;
    const index = this.findIndexOfSongInSongsList(songs, currentlyPlayingSong);

    if (index === 0) {
      this.restartSong();
    } else {
      setCurrentlyPlayingSong(songs[index - 1]);
    }
  };

  handleSkipNext = () => {
    const { songs, currentlyPlayingSong, repeatMode, shuffle, setCurrentlyPlayingSong } = this.props;
    const index = this.findIndexOfSongInSongsList(songs, currentlyPlayingSong);

    if (shuffle) {
      const index = Math.floor(Math.random() * songs.length);
      return setCurrentlyPlayingSong(songs[index]);
    }

    if (index === songs.length - 1) { // If song is last in playlist
      if (repeatMode === 'all') { // and repeatMode is 'all', play first in playlist
        setCurrentlyPlayingSong(songs[0]);
      } else if (repeatMode === 'one') { // and repeatMode is 'one', restart track
        this.restartSong();
      } else {
        this.stopSong(); // else stop playback
      }
    } else {
      setCurrentlyPlayingSong(songs[index + 1]); // else play the next song
    }
  };

  onSongEnd = ({ didJustFinish }) => {
    if (didJustFinish) {
      this.handleSkipNext();
    }
  };

  sortData = data => {
    if (!data) {
      return data;
    }

    const sortedBy = this.props.myPlaylistSortedBy;
    switch (sortedBy) {
      case 0:
        return _.sortBy(data, 'dateAdded');
      case 1:
        return _.sortBy(data, 'dateAdded').reverse();
      case 2:
        return _.sortBy(data, 'title');
      case 3:
        return _.sortBy(data, 'title').reverse();
    }
  };

  renderRepeatIcon = repeatMode => {
    const icon = {
      name: 'repeat',
      color: '#9E9E9E'
    };

    if (repeatMode === 'one') {
      icon.name = 'repeat-one',
      icon.color = '#FFFFFF'
    } else if (repeatMode === 'all') {
      icon.color = '#FFFFFF'
    }

    return icon;
  };

  render() {
    const {
      currentlyPlayingSong,
      playbackObject,
      positionMillis,
      durationMillis,
      scrubPositionMillis,
      isPlaying,
      shuffle,
      toggleShuffle,
      toggleRepeat,
      scrubThroughSong,
      repeatMode,
      didJustFinish,
    } = this.props;
    if (!playbackObject) return <View />;

    return (
      <View style={styles.playerContainer}>
        <Text style={styles.songTitle}>
          {currentlyPlayingSong.title.slice(0, 50)}
        </Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.minsAndSecs}>
          {
            scrubPositionMillis !== null
            ?
              this.millisToMinsAndSecs(scrubPositionMillis)
            :
              this.millisToMinsAndSecs(positionMillis)
          }
          </Text>
          <Slider
            thumbTintColor='#FFFFFF'
            value={scrubPositionMillis || positionMillis}
            minimumValue={0.001}
            maximumValue={durationMillis}
            step={durationMillis / 100}
            onSlidingComplete={value => this.skipToPosition(value)}
            onValueChange={value => scrubThroughSong(value)}
            thumbStyle={{ width: 15, height: 15, borderRadius: 15 }}
            style={styles.slider}
          />
          <Text style={styles.minsAndSecs}>{this.millisToMinsAndSecs(durationMillis)}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Icon
            name={this.renderRepeatIcon(repeatMode).name}
            color={this.renderRepeatIcon(repeatMode).color}
            onPress={() => toggleRepeat()}
          />
          <Icon
            name='skip-previous'
            color='#FFFFFF'
            onPress={() => this.handleSkipPrevious()}
          />
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            onPress={() => this.togglePlayPause()}
            color='#FFFFFF'
          />
          <Icon
            name='skip-next'
            color='#FFFFFF'
            onPress={() => this.handleSkipNext()}
          />
          <Icon
            name='shuffle'
            color={shuffle ? '#FFFFFF' : '#9E9E9E'}
            onPress={() => toggleShuffle()}
          />
        </View>
      </View>
    );
  }
};

const styles = {
  playerContainer: {
    backgroundColor: 'rgba(242,108,79, 0.7)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 30,
    paddingBottom: 15,
  },
  button: {
    width: 60,
  },
  songTitle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    marginTop: 7,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  minsAndSecs: {
    color: '#FFFFFF',
    paddingLeft: 4,
    paddingRight: 4,
    width: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

const mapStateToProps = ({ player: {
  currentlyPlayingSong,
  playbackObject,
  isPlaying,
  durationMillis,
  positionMillis,
  scrubPositionMillis,
  shuffle,
  didJustFinish,
  repeatStates,
  repeatIndex,
}}) => {
  return {
    currentlyPlayingSong,
    playbackObject,
    isPlaying,
    durationMillis,
    positionMillis,
    scrubPositionMillis,
    shuffle,
    didJustFinish,
    repeatMode: repeatStates[repeatIndex],
  };
};

export default connect(mapStateToProps, {
  setPlaybackObject,
  clearPlaybackObject,
  onPlaybackStatusUpdate,
  togglePlayPause,
  toggleRepeat,
  toggleShuffle,
  scrubThroughSong,
  setCurrentlyPlayingSong,
})(Player);
