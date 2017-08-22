import {
  TOGGLE_PREVIEW_SONG_MODAL,
  PREVIEW_SONG,
  SET_CURRENTLY_PLAYING_SONG,
} from '../actions/types';

const initialState = {
  isPreviewSongModalOpen: false,
  songBeingPreviewed: null,
  currentlyPlayingSong: null,
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

    default:
      return state;
  }
};
