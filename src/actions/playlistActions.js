import axios from 'axios';
import YTSearch from 'youtube-api-search';
import {
  GET_MY_PLAYLISTS_START,
  GET_MY_PLAYLISTS_SUCCESS,
  GET_MY_PLAYLISTS_FAILURE,
  GET_FRIENDS_PLAYLISTS_START,
  GET_FRIENDS_PLAYLISTS_SUCCESS,
  GET_FRIENDS_PLAYLISTS_FAILURE,
  CREATE_PLAYLIST_START,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  SEARCH_SONGS_START,
  SEARCH_SONGS_SUCCESS,
  SEARCH_SONGS_FAILURE,
  CLEAR_SEARCH_SONGS_RESULTS,
  GET_SONGS_IN_PLAYLIST_START,
  GET_SONGS_IN_PLAYLIST_SUCCESS,
  GET_SONGS_IN_PLAYLIST_FAILURE,
  ADD_SONG_START,
  ADD_SONG_SUCCESS,
  ADD_SONG_FAILURE,
} from './types';
import { API_KEY } from '../config';

const URL = 'http://192.168.0.14:3000/api';

export const getMyPlaylists = authToken => async dispatch => {
  dispatch(getMyPlaylistsStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/playlist/foruser`);
    console.log({success});
    dispatch(getMyPlaylistsSuccess(success.playlists))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(getMyPlaylistsFailure(err.response.data.error));
    }
  }
};

const getMyPlaylistsStart = () => {
  return {
    type: GET_MY_PLAYLISTS_START
  };
};

const getMyPlaylistsSuccess = myPlaylists => {
  return {
    type: GET_MY_PLAYLISTS_SUCCESS,
    payload: { myPlaylists }
  };
};

const getMyPlaylistsFailure = error => {
  return {
    type: GET_MY_PLAYLISTS_FAILURE,
    payload: { error }
  };
};

export const getFriendsPlaylists = authToken => async dispatch => {
  dispatch(getFriendsPlaylistsStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/playlist/byuser`);

    dispatch(getFriendsPlaylistsSuccess(success.playlists))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(getFriendsPlaylistsFailure(err.response.data.error));
    }
  }
};

const getFriendsPlaylistsStart = () => {
  return {
    type: GET_FRIENDS_PLAYLISTS_START
  };
};

const getFriendsPlaylistsSuccess = friendsPlaylists => {
  return {
    type: GET_FRIENDS_PLAYLISTS_SUCCESS,
    payload: { friendsPlaylists }
  };
};

const getFriendsPlaylistsFailure = error => {
  return {
    type: GET_FRIENDS_PLAYLISTS_FAILURE,
    payload: { error }
  };
};

export const createPlaylist = (title, forUser, authToken, navigationCallback) => async dispatch => {
  dispatch(createPlaylistStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.post(`${URL}/playlist`, {
      title,
      forUser: forUser._id,
    });

    dispatch(createPlaylistSuccess(success.playlist));
    if (success) {
      navigationCallback();
    }
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(createPlaylistFailure(err.response.data.error));
    }
  }
};

const createPlaylistStart = () => {
  return {
    type: CREATE_PLAYLIST_START
  };
};

const createPlaylistSuccess = playlist => {
  return {
    type: CREATE_PLAYLIST_SUCCESS,
    payload: { playlist }
  };
};

const createPlaylistFailure = error => {
  return {
    type: CREATE_PLAYLIST_FAILURE,
    payload: { error }
  };
};

export const searchSongs = term => async dispatch => {
  dispatch(searchSongsStart());
  try {
    YTSearch({ key: API_KEY, term }, songs => {
      dispatch(searchSongsSuccess(songs));
    });
  } catch (err) {
    console.log(err);
    dispatch(searchSongsFailure())
  }
};

const searchSongsStart = () => {
  return {
    type: SEARCH_SONGS_START
  };
};

const searchSongsSuccess = songs => {
  return {
    type: SEARCH_SONGS_SUCCESS,
    payload: { songs }
  };
};

const searchSongsFailure = () => {
  return {
    type: SEARCH_SONGS_FAILURE
  };
};

export const clearSearchSongsResults = () => {
  return {
    type: CLEAR_SEARCH_SONGS_RESULTS
  };
};

export const getSongsInPlaylist = (playlistId, authToken) => async dispatch => {
  dispatch(getSongsInPlaylistStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/song/playlist/${playlistId}`);

    dispatch(getSongsInPlaylistSuccess(success.songs))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(getSongsInPlaylistFailure(err.response.data.error));
    }
  }
};

const getSongsInPlaylistStart = () => {
  return {
    type: GET_SONGS_IN_PLAYLIST_START
  };
};

const getSongsInPlaylistSuccess = songsInPlaylist => {
  return {
    type: GET_SONGS_IN_PLAYLIST_SUCCESS,
    payload: { songsInPlaylist }
  };
};

const getSongsInPlaylistFailure = error => {
  return {
    type: GET_SONGS_IN_PLAYLIST_FAILURE,
    payload: { error }
  };
};

export const addSong = (videoId, playlistId, authToken) => async dispatch => {
  dispatch(addSongStart());
  try {
    const youTubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.post(`${URL}/song/`, { youTubeUrl, playlistId });

    dispatch(addSongSuccess(success.song))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(addSongFailure(err.response.data.error));
    }
  }
};

const addSongStart = () => {
  return {
    type: ADD_SONG_START,
  };
};

const addSongSuccess = song => {
  return {
    type: ADD_SONG_SUCCESS,
    payload: { song }
  };
};

const addSongFailure = error => {
  return {
    type: ADD_SONG_FAILURE,
    payload: { error }
  };
};
