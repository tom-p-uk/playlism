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
} from '../actions/types';

const initialState = {
  awaitingMyPlaylists: false,
  myPlaylists: null,
  myPlaylistsError: '',
  awaitingFriendsPlaylists: false,
  friendsPlaylists: null,
  friendsPlaylistsError: '',
  awaitingCreatePlaylist: false,
  createPlaylistError: '',
  searchResults: null,
  awaitingSearchResults: false,
  searchError: '',
  awaitingSongsInPlaylist: false,
  songsInPlaylist: null,
  songsInPlaylistError: '',
  awaitingAddSong: false,
  addSongError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (GET_MY_PLAYLISTS_START):
      return {
        ...state,
        awaitingMyPlaylists: true,
      };

    case (GET_MY_PLAYLISTS_SUCCESS):
      return {
        ...state,
        awaitingMyPlaylists: false,
        myPlaylists: action.payload.myPlaylists,
      };

    case (GET_MY_PLAYLISTS_FAILURE):
      return {
        ...state,
        awaitingMyPlaylists: false,
        myPlaylistsError: action.payload.myPlaylistsError,
      };

    case (GET_FRIENDS_PLAYLISTS_START):
      return {
        ...state,
        awaitingFriendsPlaylists: true,
      };

    case (GET_FRIENDS_PLAYLISTS_SUCCESS):
      return {
        ...state,
        awaitingFriendsPlaylists: false,
        friendsPlaylists: action.payload.friendsPlaylists,
      };

    case (GET_FRIENDS_PLAYLISTS_FAILURE):
      return {
        ...state,
        awaitingFriendsPlaylists: false,
        friendsPlaylistsError: action.payload.friendsPlaylistsError,
      };

    case (CREATE_PLAYLIST_START):
      return {
        ...state,
        awaitingCreatePlaylist: true,
      };

    case (CREATE_PLAYLIST_SUCCESS):
      return {
        ...state,
        awaitingCreatePlaylist: false,
        friendsPlaylists: [...state.friendsPlaylists, action.payload.playlist]
      };

    case (CREATE_PLAYLIST_FAILURE):
      return {
        ...state,
        awaitingCreatePlaylist: false,
        createPlaylistError: action.payload.error,
      };

    case (SEARCH_SONGS_START):
      return {
        ...state,
        awaitingSearchResults: true,
      };

    case (SEARCH_SONGS_SUCCESS):
      return {
        ...state,
        searchResults: action.payload.songs,
        searchError: '',
        awaitingSearchResults: false,
      };

    case (SEARCH_SONGS_FAILURE):
      return {
        ...state,
        searchError: 'Could not return any search results.',
        awaitingSearchResults: false,
      };

    case (CLEAR_SEARCH_SONGS_RESULTS):
      return {
        ...state,
        searchResults: null,
      };

    case (GET_SONGS_IN_PLAYLIST_START):
      return {
        ...state,
        awaitingSongsInPlaylist: true,
      };

    case (GET_SONGS_IN_PLAYLIST_SUCCESS):
      return {
        ...state,
        awaitingSongsInPlaylist: false,
        songsInPlaylist: action.payload.songsInPlaylist
      };

    case (GET_SONGS_IN_PLAYLIST_FAILURE):
      return {
        ...state,
        awaitingSongsInPlaylist: false,
        songsInPlaylistError: action.payload.error
      };

    case (ADD_SONG_START):
      return {
        ...state,
        awaitingAddSong: true,
      };

    case (ADD_SONG_SUCCESS):
      return {
        ...state,
        awaitingAddSong: false,
        songsInPlaylist: [...state.songsInPlaylist, action.payload.song],
        addSongError: '',
      };

    case (ADD_SONG_FAILURE):
      return {
        ...state,
        awaitingAddSong: false,
        addSongError: action.payload.error
      };

    default:
      return state;
  }
};
