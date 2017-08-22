import axios from 'axios';
import { FileSystem } from 'expo';
import {
  DOWNLOAD_SONG_START,
  DOWNLOAD_SONG_SUCCESS,
  DOWNLOAD_SONG_FAILURE,
  DELETE_DOWNLOADED_SONG_START,
  DELETE_DOWNLOADED_SONG_SUCCESS,
  DELETE_DOWNLOADED_SONG_FAILURE,
} from './types';

export const downloadSong = song => async dispatch => {
  const { youTubeUrl, _id } = song;
  dispatch(downloadSongStart(_id));

  try {
    let { data } = await axios.get(`http://www.youtubeinmp3.com/fetch/?format=json&video=${youTubeUrl}`);
    let { link } = data;

    // API sends a link to a page for larger files. Pull the URL from the response,
    // send new request, and then pull download link from the second response.
    if (JSON.stringify(data).indexOf('" />') !== -1) {
      const url = data.split('url=')[1].split('" />')[0];
      const res = await axios.get(url);
      console.log('-------------------------------------------------');
      link = 'http://www.youtubeinmp3.com';
      link += res.data.split('id="download" href="')[1].split('">')[0];
      console.log(link);
    }

    const { uri } = await FileSystem.downloadAsync(link, FileSystem.documentDirectory + `${_id}.mp3`);
    console.log('Finished downloading to ', uri);

    const updatedSong = {...song, localUri: uri, downloadedOn: Date.now() };
    dispatch(downloadSongSuccess(updatedSong));

  } catch (err) {
    console.log(err);
    dispatch(downloadSongFailure(song, err));
  }
};

const downloadSongStart = songId => {
  return {
    type: DOWNLOAD_SONG_START,
    payload: { songId }
  };
};

const downloadSongSuccess = song => {
  return {
    type: DOWNLOAD_SONG_SUCCESS,
    payload: { song }
  };
};

const downloadSongFailure = (song, error) => {
  return {
    type: DOWNLOAD_SONG_FAILURE,
    payload: { song, error }
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
