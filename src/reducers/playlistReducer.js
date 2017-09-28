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
  EDIT_PLAYLIST_TITLE_START,
  EDIT_PLAYLIST_TITLE_SUCCESS,
  EDIT_PLAYLIST_TITLE_FAILURE,
  DELETE_FRIENDS_PLAYLIST_START,
  DELETE_FRIENDS_PLAYLIST_SUCCESS,
  DELETE_FRIENDS_PLAYLIST_FAILURE,
  SORT_FRIENDS_PLAYLIST,
  SORT_MY_PLAYLIST,
  LOGOUT,
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
  awaitingSongsInFriendsPlaylist: false,
  songsInFriendsPlaylist: null,
  songsInFriendsPlaylistError: '',
  awaitingSongsInMyPlaylist: false,
  songsInMyPlaylist: null,
  songsInMyPlaylistError: '',
  awaitingAddSong: false,
  addSongError: '',
  awaitingDeleteSong: false,
  deleteSongError: '',
  awaitingEditPlaylistTitle: false,
  editPlaylistTitleError: '',
  awaitingDeleteFriendsPlaylist: false,
  deleteFriendsPlaylistError: '',
  friendsPlaylistSortedBy: 1,
  myPlaylistSortedBy: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (GET_MY_PLAYLISTS_START):
      return {
        ...state,
        awaitingMyPlaylists: true,
        myPlaylistsError: '',
      };

    case (GET_MY_PLAYLISTS_SUCCESS):
      return {
        ...state,
        awaitingMyPlaylists: false,
        myPlaylists: action.payload.myPlaylists,
        myPlaylistsError: '',
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
        friendsPlaylistsError: '',
      };

    case (GET_FRIENDS_PLAYLISTS_SUCCESS):
      return {
        ...state,
        awaitingFriendsPlaylists: false,
        friendsPlaylists: action.payload.friendsPlaylists,
        friendsPlaylistsError: '',
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
        createPlaylistError: '',
      };

    case (CREATE_PLAYLIST_SUCCESS):
      return {
        ...state,
        awaitingCreatePlaylist: false,
        friendsPlaylists: [...state.friendsPlaylists, action.payload.playlist],
        createPlaylistError: '',
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
        searchError: '',
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

    case (GET_SONGS_IN_FRIENDS_PLAYLIST_START):
      return {
        ...state,
        awaitingSongsInFriendsPlaylist: true,
        songsInFriendsPlaylistError: '',
      };

    case (GET_SONGS_IN_FRIENDS_PLAYLIST_SUCCESS):
      return {
        ...state,
        awaitingSongsInFriendsPlaylist: false,
        songsInFriendsPlaylist: action.payload.songsInFriendsPlaylist,
        songsInFriendsPlaylistError: '',
      };

    case (GET_SONGS_IN_FRIENDS_PLAYLIST_FAILURE):
      return {
        ...state,
        awaitingSongsInFriendsPlaylist: false,
        songsInFriendsPlaylistError: action.payload.error
      };

    case (GET_SONGS_IN_MY_PLAYLIST_START):
      return {
        ...state,
        awaitingSongsInMyPlaylist: true,
        songsInMyPlaylistError: '',
      };

    case (GET_SONGS_IN_MY_PLAYLIST_SUCCESS):
      return {
        ...state,
        awaitingSongsInMyPlaylist: false,
        songsInMyPlaylist: action.payload.songsInMyPlaylist,
        songsInMyPlaylistError: '',
      };

    case (GET_SONGS_IN_MY_PLAYLIST_FAILURE):
      return {
        ...state,
        awaitingSongsInMyPlaylist: false,
        songsInMyPlaylistError: action.payload.error
      };

    case (ADD_SONG_START):
      return {
        ...state,
        awaitingAddSong: true,
        addSongError: '',
      };

    case (ADD_SONG_SUCCESS):
      return {
        ...state,
        awaitingAddSong: false,
        songsInFriendsPlaylist: [...state.songsInFriendsPlaylist, action.payload.song],
        addSongError: '',
      };

    case (ADD_SONG_FAILURE):
      return {
        ...state,
        awaitingAddSong: false,
        addSongError: action.payload.error
      };

    case (DELETE_SONG_START):
      return {
        ...state,
        awaitingDeleteSong: true,
        deleteSongError: '',
      };

    case (DELETE_SONG_SUCCESS):
      return {
        ...state,
        songsInFriendsPlaylist: action.payload.songsInFriendsPlaylist,
        deleteSongError: '',
        awaitingDeleteSong: false,
      };

    case (DELETE_SONG_FAILURE):
      return {
        ...state,
        deleteSongError: action.payload.error,
        awaitingDeleteSong: false,
      };

    case (EDIT_PLAYLIST_TITLE_START):
      return {
        ...state,
        awaitingEditPlaylistTitle: true,
        editPlaylistTitleError: '',
      };

    case (EDIT_PLAYLIST_TITLE_SUCCESS):
      return {
        ...state,
        awaitingEditPlaylistTitle: false,
        friendsPlaylists: action.payload.friendsPlaylists,
        editPlaylistTitleError: '',
      };

    case (EDIT_PLAYLIST_TITLE_FAILURE):
      return {
        ...state,
        awaitingEditPlaylistTitle: false,
        editPlaylistTitleError: action.payload.error,
      };

    case (DELETE_FRIENDS_PLAYLIST_START):
      return {
        ...state,
        awaitingDeleteFriendsPlaylist: true,
        deleteFriendsPlaylistError: '',
      };

    case (DELETE_FRIENDS_PLAYLIST_SUCCESS):
      return {
        ...state,
        friendsPlaylists: action.payload.friendsPlaylists,
        deleteFriendsPlaylistError: '',
        awaitingDeleteFriendsPlaylist: false,
      };

    case (DELETE_FRIENDS_PLAYLIST_FAILURE):
      return {
        ...state,
        deleteFriendsPlaylistError: action.payload.error,
        awaitingDeleteFriendsPlaylist: false,
      };

    case (SORT_FRIENDS_PLAYLIST):
      return {
        ...state,
        friendsPlaylistSortedBy: action.payload.index,
      };

    case (SORT_MY_PLAYLIST):
      return {
        ...state,
        myPlaylistSortedBy: action.payload.index,
      };

    case (LOGOUT):
      return { ...initialState };

    default:
      return state;
  }
};
