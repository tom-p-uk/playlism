import {
  PREVIEW_SONG,
  TOGGLE_PREVIEW_SONG_MODAL,
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
