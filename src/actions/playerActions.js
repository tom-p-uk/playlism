import {
  PREVIEW_SONG,
  TOGGLE_PREVIEW_SONG_MODAL,
  SET_CURRENTLY_PLAYING_SONG,
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
