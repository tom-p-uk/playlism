import {
  TOGGLE_PREVIEW_SONG_MODAL,
  PREVIEW_SONG,
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
  SORT_PLAYER_PLAYLIST,
} from '../actions/types';

const initialState = {
  isPreviewSongModalOpen: false,
  songBeingPreviewed: null,
  currentlyPlayingSong: null,
  playbackObject: null,
  durationMillis: null,
  positionMillis: null,
  scrubPositionMillis: null,
  isPlaying: false,
  volume: 1.0,
  isMuted: false,
  repeatStates: ['none', 'all', 'one'],
  repeatIndex: 0,
  shuffle: false,
  playerPlaylistSortedBy: 1,
  didJustFinish: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (PREVIEW_SONG):
      return {
        ...state,
        songBeingPreviewed: action.payload.songBeingPreviewed,
      };

    case (TOGGLE_PREVIEW_SONG_MODAL):
      return {
        ...state,
        isPreviewSongModalOpen: !state.isPreviewSongModalOpen,
      };

    case (SET_CURRENTLY_PLAYING_SONG):
      return {
        ...state,
        currentlyPlayingSong: action.payload.song,
      };

    case (SET_PLAYBACK_OBJECT):
      return {
        ...state,
        playbackObject: action.payload.sound,
      };

    case (CLEAR_PLAYBACK_OBJECT):
      return {
        ...state,
        playbackObject: null,
      };

    case (ON_PLAYBACK_STATUS_UPDATE):
      return {
        ...state,
        durationMillis: action.payload.durationMillis,
        positionMillis: action.payload.positionMillis,
        volume: action.payload.volume,
        isPlaying: action.payload.isPlaying,
        didJustFinish: action.payload.didJustFinish,
      };

    case (TOGGLE_PLAY_PAUSE):
    console.log(action);
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };

    case (TOGGLE_REPEAT):
      return {
        ...state,
        repeatIndex: ++state.repeatIndex % 3,
      };

    case (TOGGLE_SHUFFLE):
      return {
        ...state,
        shuffle: !state.shuffle,
      };

    case (SKIP_TO_PREVIOUS_SONG):
      return {
        ...state,
      };

    case (SKIP_TO_NEXT_SONG):
      return {
        ...state,
      };

    case (SCRUB_THROUGH_SONG):
      return {
        ...state,
        scrubPositionMillis: action.payload.scrubPositionMillis,
      };

    case (SORT_PLAYER_PLAYLIST):
      return {
        ...state,
        playerPlaylistSortedBy: action.payload.index,
      };

    default:
      return state;
  }
};
