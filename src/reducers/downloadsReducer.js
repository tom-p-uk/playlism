import {
  DOWNLOAD_SONG_START,
  DOWNLOAD_SONG_SUCCESS,
  DOWNLOAD_SONG_FAILURE,
  DELETE_DOWNLOADED_SONG_START,
  DELETE_DOWNLOADED_SONG_SUCCESS,
  DELETE_DOWNLOADED_SONG_FAILURE,
} from '../actions/types';

const initialState = {
  awaitingDownloadSong: false,
  downloadedSongs: [],
  downloadSongError: '',
  awaitingDeleteDownloadedSong: false,
  deleteDownloadedSongError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (DOWNLOAD_SONG_START):
      return {
        ...state,
        awaitingDownloadSong: true,
      };

    case (DOWNLOAD_SONG_SUCCESS):
      return {
        ...state,
        awaitingDownloadSong: false,
        downloadedSongs: [...state.downloadedSongs, action.payload.song],
        downloadSongError: '',
      };

    case (DOWNLOAD_SONG_FAILURE):
      return {
        ...state,
        awaitingDownloadSong: false,
        downloadSongError: action.payload.error,
      };

    case (DELETE_DOWNLOADED_SONG_START):
      return {
        ...state,
        awaitingDeleteDownloadedSong: true,
      };

    case (DELETE_DOWNLOADED_SONG_SUCCESS):
      return {
        ...state,
        awaitingDeleteDownloadedSong: false,
        downloadedSongs: state.downloadedSongs.filter(song => song._id !== action.payload.song._id),
        deleteDownloadedSongError: '',
      };

    case (DELETE_DOWNLOADED_SONG_FAILURE):
      return {
        ...state,
        awaitingDeleteDownloadedSong: false,
        deleteDownloadedSongError: action.payload.error,
      };

    // case ('persist/REHYDRATE'):
    //   return {
    //     ...state,
    //     downloadedSongs: action.payload.downloads.downloadedSongs,
    //   };

    default:
      return state;
  }
};
