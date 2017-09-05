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

export const downloadSong = song => async dispatch => {
  let { youTubeUrl, _id } = song;
  dispatch(downloadSongStart(_id));

  try {
    let { data } = await axios.get(`http://www.youtubeinmp3.com/fetch/?format=json&video=${youTubeUrl}`);
    let { link } = data;

    // API occasionally sends an HTML response rather than JSON. In those cases, make
    // repeated requests until a JSON response is received
    if (JSON.stringify(data).indexOf('" />') !== -1) {
      // const url = data.split('url=')[1].split('" />')[0];
      // const res = await axios.get(url);
      // console.log('-------------------------------------------------');
      // link = 'http://www.youtubeinmp3.com';
      // link += res.data.split('id="download" href="')[1].split('">')[0];
      // console.log(link);
      console.log('Reattempting download.');
      return dispatch(downloadSong(song));
    }

    let callback = ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
      if (!_.isNull(_id) && totalBytesExpectedToWrite >= 0) {
        dispatch(updateDownloadProgress(
          _id,
          totalBytesWritten,
          totalBytesExpectedToWrite
        ));
      }
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      link,
      FileSystem.documentDirectory + `${_id}.mp3`,
      {},
      _.throttle(callback, 400),
    );

    const { uri } = await downloadResumable.downloadAsync();
    const { size } = await FileSystem.getInfoAsync(uri);

    if (size < 100000) {
      dispatch(deleteDownloadedSong(song));
      return dispatch(downloadSongFailure(song));
    }

    console.log('Finished downloading to ', uri);

    _id = null;

    const updatedSong = {...song, localUri: uri, downloadedOn: Date.now() };
    return dispatch(downloadSongSuccess(updatedSong));

  } catch (err) {
    console.log(err);
    dispatch(downloadSongFailure(song));
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
    dispatch(deleteDownloadedSongFailure(song._id, err));
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
