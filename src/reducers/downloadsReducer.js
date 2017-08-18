import {
  DOWNLOAD_SONG_START,
  DOWNLOAD_SONG_SUCCESS,
  DOWNLOAD_SONG_FAILURE,
  DELETE_DOWNLOADED_SONG_START,
  DELETE_DOWNLOADED_SONG_SUCCESS,
  DELETE_DOWNLOADED_SONG_FAILURE,
} from '../actions/types';

const initialState = {
  currentlyDownloading: [],
  downloadedSongs: [],
  downloadSongError: '',
  currentlyDeleting: [],
  deleteDownloadedSongError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (DOWNLOAD_SONG_START):
      return {
        ...state,
        currentlyDownloading: [...state.currentlyDownloading, action.payload.songId],
      };

    case (DOWNLOAD_SONG_SUCCESS):
      return {
        ...state,
        downloadedSongs: [...state.downloadedSongs, action.payload.song],
        downloadSongError: '',
        currentlyDownloading: state.currentlyDownloading.filter(songId => songId !== action.payload.song._id),
      };

    case (DOWNLOAD_SONG_FAILURE):
      return {
        ...state,
        downloadSongError: action.payload.error,
        currentlyDownloading: state.currentlyDownloading.filter(songId => songId !== action.payload.song._id),
      };

    case (DELETE_DOWNLOADED_SONG_START):
      return {
        ...state,
        currentlyDeleting: [...state.currentlyDeleting, action.payload.songId]
      };

    case (DELETE_DOWNLOADED_SONG_SUCCESS):
      return {
        ...state,
        downloadedSongs: state.downloadedSongs.filter(downloadedSong => downloadedSong._id !== action.payload.songId),
        currentlyDeleting: state.currentlyDeleting.filter(songId => songId !== action.payload.songId),
        deleteDownloadedSongError: '',
      };

    case (DELETE_DOWNLOADED_SONG_FAILURE):
      return {
        ...state,
        currentlyDeleting: state.currentlyDeleting.filter(songId => songId !== action.payload.songId),
        deleteDownloadedSongError: action.payload.error,
      };

    default:
      return state;
  }
};
