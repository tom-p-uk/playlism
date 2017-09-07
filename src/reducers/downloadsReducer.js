import _ from 'lodash';
import {
  DOWNLOAD_SONG_START,
  DOWNLOAD_SONG_SUCCESS,
  DOWNLOAD_SONG_FAILURE,
  DELETE_DOWNLOADED_SONG_START,
  DELETE_DOWNLOADED_SONG_SUCCESS,
  DELETE_DOWNLOADED_SONG_FAILURE,
  UPDATE_DOWNLOAD_PROGRESS,
} from '../actions/types';

const initialState = {
  pendingDownloads: [],
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
        pendingDownloads: _.uniq([...state.pendingDownloads, action.payload.songId]),
        downloadSongError: '',
      };

    case (UPDATE_DOWNLOAD_PROGRESS): // TODO - get simultaneous downloads working with download progress display
      return {
        ...state,
        pendingDownloads: state.pendingDownloads.filter(songId => songId !== action.payload.songId),
        currentlyDownloading: _.uniqBy([...state.currentlyDownloading, action.payload], 'songId').map(download => {
          if (download.songId === action.payload.songId) {
            return action.payload;
          } else {
            return download;
          }
        })
      };

    case (DOWNLOAD_SONG_SUCCESS):
      return {
        ...state,
        downloadedSongs: [...state.downloadedSongs, action.payload.song],
        currentlyDownloading: state.currentlyDownloading.filter(download => download.songId !== action.payload.song._id),
        downloadSongError: '',

      };

    case (DOWNLOAD_SONG_FAILURE):
    console.log(action.payload);
      return {
        ...state,
        downloadSongError: `${action.payload.song.title} failed to download. Please try again.`,
        pendingDownloads: state.pendingDownloads.filter(songId => songId !== action.payload.song._id),
        currentlyDownloading: state.currentlyDownloading.filter(download => download.songId !== action.payload.song._id),
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
