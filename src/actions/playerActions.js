import { Audio } from 'expo';
import {
  PREVIEW_SONG,
  TOGGLE_PREVIEW_SONG_MODAL,
  SET_CURRENTLY_PLAYING_SONG,
  SET_PLAYBACK_OBJECT,
  CLEAR_PLAYBACK_OBJECT,
  ON_PLAYBACK_STATUS_UPDATE,
  TOGGLE_PLAY_PAUSE,
  TOGGLE_REPEAT,
  TOGGLE_SHUFFLE,
  SKIP_TO_PREVIOUS_SONG,
  SKIP_TO_NEXT_SONG,
  SCRUB_THROUGH_SONG,
} from './types';

export const previewSong = videoId => dispatch => {
  dispatch(togglePreviewSongModal());

  dispatch({
    type: PREVIEW_SONG,
    payload: { songBeingPreviewed: videoId }
  });
};

export const togglePreviewSongModal = () => {
  return {
    type: TOGGLE_PREVIEW_SONG_MODAL
  };
};

export const setCurrentlyPlayingSong = song => {
  return {
    type: SET_CURRENTLY_PLAYING_SONG,
    payload: { song }
  };
};

export const setPlaybackObject = sound => async dispatch => {
  dispatch({
    type: SET_PLAYBACK_OBJECT,
    payload: { sound },
  })
};

export const clearPlaybackObject = () => {
  return {
    type: CLEAR_PLAYBACK_OBJECT
  };
};

export const onPlaybackStatusUpdate = ({ durationMillis, positionMillis, volume, isPlaying }) => {
  return {
    type: ON_PLAYBACK_STATUS_UPDATE,
    payload: {
      durationMillis,
      positionMillis,
      volume,
      isPlaying,
    }
  };
};

export const togglePlayPause = () => {
  return {
    type: TOGGLE_PLAY_PAUSE,
  };
};

export const toggleRepeat = () => {
  return {
    type: TOGGLE_REPEAT,
  };
};

export const toggleShuffle = () => {
  return {
    type: TOGGLE_SHUFFLE,
  };
};

export const skipToPreviousSong = () => {
  return {
    type: SKIP_TO_PREVIOUS_SONG,
  };
};

export const skipToNextSong = () => {
  return {
    type: SKIP_TO_NEXT_SONG,
  };
};

export const scrubThroughSong = scrubPositionMillis => {
  return {
    type: SCRUB_THROUGH_SONG,
    payload: { scrubPositionMillis }
  };
};
