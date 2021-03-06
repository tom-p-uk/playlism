import axios from 'axios';
import _ from 'lodash';
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
  GET_SONGS_IN_FRIENDS_PLAYLIST_START,
  GET_SONGS_IN_FRIENDS_PLAYLIST_SUCCESS,
  GET_SONGS_IN_FRIENDS_PLAYLIST_FAILURE,
  GET_SONGS_IN_MY_PLAYLIST_START,
  GET_SONGS_IN_MY_PLAYLIST_SUCCESS,
  GET_SONGS_IN_MY_PLAYLIST_FAILURE,
  ADD_SONG_START,
  ADD_SONG_SUCCESS,
  ADD_SONG_FAILURE,
  DELETE_SONG_START,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
  LIKE_SONG_START,
  LIKE_SONG_SUCCESS,
  LIKE_SONG_FAILURE,
  UNLIKE_SONG_START,
  UNLIKE_SONG_SUCCESS,
  UNLIKE_SONG_FAILURE,
  EDIT_PLAYLIST_TITLE_START,
  EDIT_PLAYLIST_TITLE_SUCCESS,
  EDIT_PLAYLIST_TITLE_FAILURE,
  DELETE_FRIENDS_PLAYLIST_START,
  DELETE_FRIENDS_PLAYLIST_SUCCESS,
  DELETE_FRIENDS_PLAYLIST_FAILURE,
  SORT_FRIENDS_PLAYLIST,
  SORT_MY_PLAYLIST,
} from './types';
import { API_KEY } from '../config';

const URL = 'https://playlism.herokuapp.com/api';

export const getMyPlaylists = authToken => async dispatch => {
  dispatch(getMyPlaylistsStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/playlist/foruser`);

    dispatch(getMyPlaylistsSuccess(success.playlists));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(getMyPlaylistsFailure(err.response.data.error));
    } else {
      dispatch(getMyPlaylistsFailure('Could not fetch your playlists.'));
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

    dispatch(getFriendsPlaylistsSuccess(success.playlists));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(getFriendsPlaylistsFailure(err.response.data.error));
    } else {
      dispatch(getFriendsPlaylistsFailure('Could not fetch your friends\' playlists.'));
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

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(createPlaylistFailure(err.response.data.error));
    } else {
      dispatch(createPlaylistFailure('Could not create the playlist.'));
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
    dispatch(searchSongsFailure());
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

export const getSongsInFriendsPlaylist = (playlistId, authToken) => async dispatch => {
  dispatch(getSongsInFriendsPlaylistStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/song/playlist/${playlistId}`);

    dispatch(getSongsInFriendsPlaylistSuccess(success.songs));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(getSongsInFriendsPlaylistFailure(err.response.data.error));
    } else {
      dispatch(getSongsInFriendsPlaylistFailure('Could not fetch songs.'));
    }
  }
};

const getSongsInFriendsPlaylistStart = () => {
  return {
    type: GET_SONGS_IN_FRIENDS_PLAYLIST_START
  };
};

const getSongsInFriendsPlaylistSuccess = songsInFriendsPlaylist => {
  return {
    type: GET_SONGS_IN_FRIENDS_PLAYLIST_SUCCESS,
    payload: { songsInFriendsPlaylist }
  };
};

const getSongsInFriendsPlaylistFailure = error => {
  return {
    type: GET_SONGS_IN_FRIENDS_PLAYLIST_FAILURE,
    payload: { error }
  };
};

export const getSongsInMyPlaylist = (playlistId, authToken) => async dispatch => {
  dispatch(getSongsInMyPlaylistStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/song/playlist/${playlistId}`);
    dispatch(getSongsInMyPlaylistSuccess(success.songs));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(getSongsInMyPlaylistFailure(err.response.data.error));
    } else {
      dispatch(getSongsInMyPlaylistFailure('Could not fetch songs in playlist.'));
    }
  }
};

const getSongsInMyPlaylistStart = () => {
  return {
    type: GET_SONGS_IN_MY_PLAYLIST_START
  };
};

const getSongsInMyPlaylistSuccess = songsInMyPlaylist => {
  return {
    type: GET_SONGS_IN_MY_PLAYLIST_SUCCESS,
    payload: { songsInMyPlaylist }
  };
};

const getSongsInMyPlaylistFailure = error => {
  return {
    type: GET_SONGS_IN_MY_PLAYLIST_FAILURE,
    payload: { error }
  };
};

export const addSong = (videoId, title, description, thumbnail, playlistId, authToken) => async dispatch => {
  dispatch(addSongStart());
  try {
    const youTubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.post(`${URL}/song/`, {
      youTubeUrl,
      title,
      description,
      thumbnail,
      playlistId,
    });

    dispatch(addSongSuccess(success.song));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(addSongFailure(err.response.data.error));
    } else {
      dispatch(addSongFailure('Could not add song.'));
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

export const deleteSong = (songId, playlistId, songsInFriendsPlaylist, authToken) => async dispatch => {
  dispatch(deleteSongStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    await axios.delete(`${URL}/song/${playlistId}/${songId}`);

    const songsInFriendsPlaylistFiltered = _.filter(songsInFriendsPlaylist, song => song._id !== songId);

    dispatch(deleteSongSuccess(songsInFriendsPlaylistFiltered))
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(deleteSongFailure(err.response.data.error));
    } else {
      dispatch(deleteSongFailure('Could not delete song.'));
    }
  }
};

const deleteSongStart = () => {
  return {
    type: DELETE_SONG_START,
  };
};

const deleteSongSuccess = songsInFriendsPlaylist => {
  return {
    type: DELETE_SONG_SUCCESS,
    payload: { songsInFriendsPlaylist }
  };
};

const deleteSongFailure = error => {
  return {
    type: DELETE_SONG_FAILURE,
    payload: { error }
  };
};

export const likeSong = (songId, authToken, songsInFriendsPlaylist) => async dispatch => {
  dispatch(likeSongStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.like(`${URL}/song/like/${songId}`);

    const index = _.findIndex(songsInFriendsPlaylist, song => song._id === songId);
    songsInFriendsPlaylist[index] = success.song;

    dispatch(likeSongSuccess(songsInFriendsPlaylist));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(likeSongFailure(err.response.data.error));
    } else {
      dispatch(likeSongFailure('Could not like song.'));
    }
  }
};

const likeSongStart = () => {
  return {
    type: LIKE_SONG_START,
  };
};

const likeSongSuccess = songsInMyPlaylist => {
  return {
    type: LIKE_SONG_SUCCESS,
    payload: { songsInMyPlaylist }
  };
};

const likeSongFailure = error => {
  return {
    type: LIKE_SONG_FAILURE,
    payload: { error }
  };
};

export const unlikeSong = (songId, playlistId, songsInMyPlaylist, authToken) => async dispatch => {
  dispatch(unlikeSongStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.unlike(`${URL}/song/${playlistId}/${songId}`);

    const songsInMyPlaylistFiltered = _.filter(songsInMyPlaylist, song => song._id !== songId);
    dispatch(unlikeSongSuccess(songsInMyPlaylistFiltered));
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(unlikeSongFailure(err.response.data.error));
    } else {
      dispatch(unlikeSongFailure('Could not unlike song.'));
    }
  }
};

const unlikeSongStart = () => {
  return {
    type: UNLIKE_SONG_START,
  };
};

const unlikeSongSuccess = songsInMyPlaylist => {
  return {
    type: UNLIKE_SONG_SUCCESS,
    payload: { songsInMyPlaylist }
  };
};

const unlikeSongFailure = error => {
  return {
    type: UNLIKE_SONG_FAILURE,
    payload: { error }
  };
};

export const editPlaylistTitle = (playlistId, title, friendsPlaylists, authToken, navigationCallback) => async dispatch => {
  dispatch(editPlaylistTitleStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.put(`${URL}/playlist/title/${playlistId}`, { title });

    const index = _.findIndex(friendsPlaylists, { _id: playlistId });
    friendsPlaylists.splice(index, 1, success.playlist);

    dispatch(editPlaylistTitleSuccess(friendsPlaylists));

    if (success) {
      navigationCallback();
    }
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(editPlaylistTitleFailure(err.response.data.error));
    } else {
      dispatch(editPlaylistTitleFailure('Could not edit playlist.'));
    }
  }
};

const editPlaylistTitleStart = () => {
  return {
    type: EDIT_PLAYLIST_TITLE_START,
  };
};

const editPlaylistTitleSuccess = friendsPlaylists => {
  return {
    type: EDIT_PLAYLIST_TITLE_SUCCESS,
    payload: { friendsPlaylists }
  };
};

const editPlaylistTitleFailure = error => {
  return {
    type: EDIT_PLAYLIST_TITLE_FAILURE,
    payload: { error }
  };
};

export const deleteFriendsPlaylist = (playlistId, friendsPlaylists, authToken, navigationCallback) => async dispatch => {
  dispatch(deleteFriendsPlaylistStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.delete(`${URL}/playlist/${playlistId}`);

    const friendsPlaylistsFiltered = _.filter(friendsPlaylists, playlist => playlist._id !== playlistId);
    dispatch(deleteFriendsPlaylistSuccess(friendsPlaylistsFiltered));

    if (success) {
      navigationCallback();
    }
  } catch (err) {
    console.log(err);

    if (err.response && err.response.data && err.response.data.error) {
      dispatch(deleteFriendsPlaylistFailure(err.response.data.error));
    } else {
      dispatch(deleteFriendsPlaylistFailure('Could not delete the playlist.'))
    }
  }
};

const deleteFriendsPlaylistStart = () => {
  return {
    type: DELETE_FRIENDS_PLAYLIST_START,
  };
};

const deleteFriendsPlaylistSuccess = friendsPlaylists => {
  return {
    type: DELETE_FRIENDS_PLAYLIST_SUCCESS,
    payload: { friendsPlaylists }
  };
};

const deleteFriendsPlaylistFailure = error => {
  return {
    type: DELETE_FRIENDS_PLAYLIST_FAILURE,
    payload: { error }
  };
};

export const sortFriendsPlaylist = index => {
  return {
    type: SORT_FRIENDS_PLAYLIST,
    payload: { index }
  };
};

export const sortMyPlaylist = index => {
  return {
    type: SORT_MY_PLAYLIST,
    payload: { index }
  };
};
