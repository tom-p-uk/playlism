import {
  TOGGLE_PREVIEW_SONG_MODAL,
  PREVIEW_SONG,
} from '../actions/types';

const initialState = {
  isPreviewSongModalOpen: false,
  songBeingPreviewed: null,
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

    default:
      return state;
  }
};
