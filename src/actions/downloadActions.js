import axios from 'axios';
import { FileSystem } from 'expo';
import _ from 'lodash';
import {
  DOWNLOAD_SONG_START,
  DOWNLOAD_SONG_SUCCESS,
  DOWNLOAD_SONG_FAILURE,
  DELETE_DOWNLOADED_SONG_START,
  DELETE_DOWNLOADED_SONG_SUCCESS,
  DELETE_DOWNLOADED_SONG_FAILURE,
  DOWNLOAD_SONG_BEGIN_WRITING,
  UPDATE_DOWNLOAD_PROGRESS
} from './types';

export const downloadSong = (song, attemptNum) => async dispatch => {
  let { youTubeUrl, _id, title } = song;
  dispatch(downloadSongStart(_id));

  // // Download fails after 7 unsuccessful download attempts
  // if (attemptNum >= 7) {
  //   return dispatch(downloadSongFailure(song));
  // }

  try {
    axios.defaults.headers.common['X-Mashape-Key'] = 'y6v4sUl94Omsh0mnCYY8N3Jy32Dvp10ZvbdjsnO8IrEINXBJB2';
    let { data: { streams } } = await axios.get(`https://getvideo.p.mashape.com?url=${youTubeUrl}`)
    let { url } = streams[streams.length - 2];

    const callback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
      // Callback is called for old as well as present downloads for some reason,
      // so _id must be set to null after downloading, and callback only called for non-null _id values
      if (totalBytesWritten === totalBytesExpectedToWrite) {
        return;
      } else if (!_.isNull(_id) && totalBytesExpectedToWrite >= 0) {
        dispatch(updateDownloadProgress(
          _id,
          totalBytesWritten,
          totalBytesExpectedToWrite
        ));
      }
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + `${_id}.m4a`,
      {},
      _.throttle(callback, 50), // Throttle for performance reaons (esp. on Android)
    );

    const { uri } = await downloadResumable.downloadAsync();
    const { size } = await FileSystem.getInfoAsync(uri);

    _id = null;
    if (!size || size < 100000) {
      return dispatch(downloadSongFailure(song));
    }

    console.log('Finished downloading to ', uri);

    const updatedSong = {...song, localUri: uri, downloadedOn: Date.now() };
    return dispatch(downloadSongSuccess(updatedSong));

  } catch (err) {
    console.log(err);
    dispatch(downloadSongFailure(song));
    FileSystem.deleteAsync(FileSystem.documentDirectory + `${_id}.mp3`);
    _id = null;
  }
};

const updateDownloadProgress = (songId, totalBytesWritten, totalBytesExpectedToWrite) => {
  return {
    type: UPDATE_DOWNLOAD_PROGRESS,
    payload: {
      songId,
      totalBytesWritten,
      totalBytesExpectedToWrite,
    }
  };
};

const downloadSongStart = songId => {
  return {
    type: DOWNLOAD_SONG_START,
    payload: { songId }
  };
};

const downloadSongBeginWriting = (songId, downloadResumable) => {

  return {
    type: DOWNLOAD_SONG_BEGIN_WRITING,
    payload: { songId, downloadResumable }
  };
};

const downloadSongSuccess = song => {
  return {
    type: DOWNLOAD_SONG_SUCCESS,
    payload: { song }
  };
};

const downloadSongFailure = song => {
  return {
    type: DOWNLOAD_SONG_FAILURE,
    payload: { song }
  };
};

export const deleteDownloadedSong = song => async dispatch => {
  dispatch(deleteDownloadedSongStart(song._id));
  try {
    await FileSystem.deleteAsync(song.localUri, { idempotent: true });
    console.log('Deleted file from ', song.localUri);

    dispatch(deleteDownloadedSongSuccess(song._id));
  } catch (err) {
    console.log(err);
    dispatch(deleteDownloadedSongFailure(song._id, `Could not delete ${song.title}`));
  }
};

const deleteDownloadedSongStart = songId => {
  return {
    type: DELETE_DOWNLOADED_SONG_START,
    payload: { songId }
  };
};

const deleteDownloadedSongSuccess = songId => {
  return {
    type: DELETE_DOWNLOADED_SONG_SUCCESS,
    payload: { songId }
  };
};

const deleteDownloadedSongFailure = (songId, error) => {
  return {
    type: DELETE_DOWNLOADED_SONG_FAILURE,
    payload: { songId, error }
  };
};
