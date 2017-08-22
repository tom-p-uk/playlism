import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Slider, Icon } from 'react-native-elements';
import { Audio } from 'expo';
import { connect } from 'react-redux';
import moment from 'moment';

class Player extends Component {
  state = {
    playbackObject: null,
    progressUpdateIntervalMillis: null,
    durationMillis: 0,
    positionMillis: 0,
    scrubPositionMillis: null,
    shouldPlay: true,
    isPlaying: null,
    volume: 1.0,
    isMuted: false,
    isLooping: false,
    value: null,
    repeatOne: false,
    shuffle: false,
    // didJustFinish:
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong) {
      this.loadSong(nextProps.currentlyPlayingSong);
    }
  }

  loadSong = async song => {
    const { playbackObject, volume, shouldPlay } = this.state;

    if (playbackObject !== null) {
      playbackObject.unloadAsync();
      this.setState({ song: null });
    }

    const source = { uri: song.localUri };
    const initialStatus = {
      volume,
      shouldPlay,
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this.onPlaybackStatusUpdate
    );

    this.setState({ playbackObject: sound });
  };

  onPlaybackStatusUpdate = ({ durationMillis, positionMillis, volume, isPlaying }) => {
    this.setState({
      durationMillis,
      positionMillis,
      volume,
      isPlaying,
    });
  };

  skipToPosition = async positionMillis => {
    await this.state.playbackObject.setPositionAsync(positionMillis);
    this.setState({ scrubPositionMillis: null });
  };

  scrubThroughSong = scrubPositionMillis => {
    this.setState({ scrubPositionMillis });
  };

  togglePlayPause = async () => {
    const { playbackObject, isPlaying } = this.state;
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
    const { currentlyPlayingSong } = this.props;
    const {
      playbackObject,
      positionMillis,
      durationMillis,
      scrubPositionMillis,
      isPlaying,
      repeatOne,
      shuffle,
    } = this.state;

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

const mapStateToProps = ({ player: { currentlyPlayingSong }}) => {
  return {
    currentlyPlayingSong,
  };
};

export default connect(mapStateToProps)(Player);
