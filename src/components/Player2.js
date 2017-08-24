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
  toggleRepeatOne,
  toggleShuffle,
} from '../actions';

class Player extends Component {
  state = {
    progressUpdateIntervalMillis: null,
    scrubPositionMillis: null,
    isPlayerMounted: false,
    // didJustFinish:
  };
  componentDidMount() {
    this.setState({ isPlayerMounted:  true });
  }

  componentWillUnmount() {
     this.setState({ isPlayerMounted:  false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong) {
      this.loadSong(nextProps.currentlyPlayingSong);
    }
  }

  loadSong = async song => {
    const { playbackObject, setPlaybackObject, onPlaybackStatusUpdate } = this.props;
    console.log(song.localUri);
  //   if (!_.isNull(playbackObject)) {
  //     playbackObject.unloadAsync();
  //     setPlaybackObject(null);
  //   }
  //
    const source = { uri: song.localUri };
    const initialStatus = {
      volume: 1.0,
      shouldPlay: true,
    };
    // console.log(source.uri);
    // setPlaybackObject(song.localUri, initialStatus);
    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      // onPlaybackStatusUpdate,
    );

    // setPlaybackObject(sound);
  };

  skipToPosition = async positionMillis => {
    await this.state.playbackObject.setPositionAsync(positionMillis);
    this.setState({ scrubPositionMillis: null });
  };

  scrubThroughSong = scrubPositionMillis => {
    this.setState({ scrubPositionMillis });
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

    if (minutes === NaN || seconds === NaN) return '';
    return (seconds == 60 ? (minutes + 1) + ':00' : minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
  };

  render() {
    const {
      currentlyPlayingSong,
      playbackObject,
      positionMillis,
      durationMillis,
      // scrubPositionMillis,
      isPlaying,
      repeatOne,
      shuffle,
    } = this.props;
    const { scrubPositionMillis } = this.state;

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
            value={positionMillis}
            minimumValue={0}
            maximumValue={durationMillis}
            step={durationMillis / 100}
            onSlidingComplete={value => this.skipToPosition(value)}
            onValueChange={value => this.scrubThroughSong(value)}
            thumbStyle={{ width: 15, height: 15, borderRadius: 15 }}
            style={styles.slider}
          />
          <Text style={styles.minsAndSecs}>{this.millisToMinsAndSecs(durationMillis)}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Icon
            name='repeat-one'
            color={repeatOne ? '#FFFFFF' : '#9E9E9E'}
            onPress={() => this.setState({ repeatOne: !repeatOne })}
          />
          <Icon
            name='fast-rewind'
            color='#FFFFFF'
            // onPress={() => this.togglePlayPause()}
          />
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            onPress={() => this.togglePlayPause()}
            color='#FFFFFF'
            // buttonStyle={styles.button}
          />
          <Icon
            name='fast-forward'
            color='#FFFFFF'
            // onPress={() => this.togglePlayPause()}
            // buttonStyle={styles.button}
          />
          <Icon
            name='shuffle'
            color={shuffle ? '#FFFFFF' : '#9E9E9E'}
            onPress={() => this.setState({ shuffle: !shuffle })}
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
    paddingTop: 15,
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
    marginLeft: 3,
    marginRight: 3,
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
  repeatOne,

}}) => {
  return {
    currentlyPlayingSong,
    playbackObject,
    isPlaying,
    durationMillis,
    positionMillis,
    scrubPositionMillis,
    shuffle,
    repeatOne,
  };
};

export default connect(mapStateToProps, {
  setPlaybackObject,
  clearPlaybackObject,
  onPlaybackStatusUpdate,
  togglePlayPause,
  toggleRepeatOne,
  toggleShuffle,
})(Player);
