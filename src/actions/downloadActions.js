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
  dispatch(downloadSongStart());
  try {
    const { youTubeUrl, _id } = song;
    let { data: { link } } = await axios.get(`https://www.youtubeinmp3.com/fetch/?format=JSON&video=${youTubeUrl}`);

    const { uri } = await FileSystem.downloadAsync(link, FileSystem.documentDirectory + `${_id}.mp3`);
    console.log('Finished downloading to ', uri);

    const updatedSong = {...song, localUri: uri };
    dispatch(downloadSongSuccess(updatedSong));
  } catch (err) {
    console.log(err);
    dispatch(downloadSongFailure(err));
  }
};

const downloadSongStart = () => {
  return {
    type: DOWNLOAD_SONG_START
  };
};

const downloadSongSuccess = song => {
  return {
    type: DOWNLOAD_SONG_SUCCESS,
    payload: { song }
  };
};

const downloadSongFailure = error => {
  return {
    type: DOWNLOAD_SONG_FAILURE,
    payload: { error }
  };
};

export const deleteDownloadedSong = song => async dispatch => {
  dispatch(deleteDownloadedSongStart());
  try {
    await FileSystem.deleteAsync(song.localUri, { idempotent: true });
    console.log('Deleted file from ', song.localUri);

    dispatch(deleteDownloadedSongSuccess(song));
  } catch (err) {
    console.log(err);
    dispatch(deleteDownloadedSongFailure(err));
  }
};

const deleteDownloadedSongStart = () => {
  return {
    type: DOWNLOAD_SONG_START
  };
};

const deleteDownloadedSongSuccess = song => {
  return {
    type: DOWNLOAD_SONG_SUCCESS,
    payload: { song }
  };
};

const deleteDownloadedSongFailure = error => {
  return {
    type: DOWNLOAD_SONG_FAILURE,
    payload: { error }
  };
};
