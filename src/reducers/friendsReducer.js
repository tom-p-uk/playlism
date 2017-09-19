import {
  SEARCH_FRIENDS_START,
  SEARCH_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_FAILURE,
  CLEAR_SEARCH_FRIENDS_RESULTS,
  GET_FRIENDS_START,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAILURE,
  GET_FRIEND_REQUESTS_START,
  GET_FRIEND_REQUESTS_SUCCESS,
  GET_FRIEND_REQUESTS_FAILURE,
  UPDATE_USER_FRIEND_STATUS,
  SEND_FRIEND_REQUEST_START,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILURE,
  LOAD_FRIEND_REQUESTS_SENT,
  RESPOND_TO_FRIEND_REQUEST_START,
  ACCEPT_FRIEND_REQUEST,
  REJECT_FRIEND_REQUEST,
  RESPOND_TO_FRIEND_REQUEST_FAILURE,
  DELETE_FRIEND_START,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAILURE,
  LOGOUT,
} from '../actions/types';

const initialState = {
  searchResults: null,
  searchError: '',
  awaitingSearchResults: false,
  friends: null,
  awaitingFriends: false,
  friendsError: '',
  friendRequests: null,
  awaitingFriendRequests: false,
  friendRequestsError: '',
  userFriendStatus: '',
  awaitingSendFriendRequest: false,
  sendFriendRequestError: '',
  friendRequestsSent: null,
  awaitingRespondToFriendRequest: false,
  respondToFriendRequestError: '',
  awaitingDeleteFriend: false,
  deleteFriendError: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case (SEARCH_FRIENDS_START):
      return {
        ...state,
        awaitingSearchResults: true,
        searchError: '',
      };

    case (SEARCH_FRIENDS_SUCCESS):
      return {
        ...state,
        searchResults: action.payload.users,
        searchError: '',
        awaitingSearchResults: false,
      };

    case (SEARCH_FRIENDS_FAILURE):
      return {
        ...state,
        searchResults: [],
        searchError: action.payload.error,
        awaitingSearchResults: false,
      };

    case (CLEAR_SEARCH_FRIENDS_RESULTS):
      return {
        ...state,
        searchResults: null,
        awaitingSearchResults: false,
      };

    case (GET_FRIENDS_START):
      return {
        ...state,
        awaitingFriends: true,
        friendsError: '',
      };

    case (GET_FRIENDS_SUCCESS):
      return {
        ...state,
        friends: action.payload.friends,
        awaitingFriends: false,
        friendsError: '',
      };

    case (GET_FRIENDS_FAILURE):
      return {
        ...state,
        friendsError: action.payload.error,
        awaitingFriends: false,
      };

    case (GET_FRIEND_REQUESTS_START):
      return {
        ...state,
        awaitingFriendRequests: true,
        friendRequestsError: '',
      };

    case (GET_FRIEND_REQUESTS_SUCCESS):
      return {
        ...state,
        friendRequests: action.payload.friendRequests,
        awaitingFriendRequests: false,
        friendRequestsError: '',
      };

    case (GET_FRIEND_REQUESTS_FAILURE):
      return {
        ...state,
        friendRequestsError: action.payload.error,
        awaitingFriendRequests: false,
      };

    case (UPDATE_USER_FRIEND_STATUS):
      return {
        ...state,
        userFriendStatus: action.payload.userFriendStatus,
      };

    case (SEND_FRIEND_REQUEST_START):
      return {
        ...state,
        awaitingSendFriendRequest: true,
        sendFriendRequestError: '',
      };

    case (SEND_FRIEND_REQUEST_SUCCESS):
      return {
        ...state,
        friendRequestsSent: action.payload.friendRequestsSent,
        awaitingSendFriendRequest: false,
        sendFriendRequestError: '',
      };

    case (SEND_FRIEND_REQUEST_FAILURE):
      return {
        ...state,
        sendFriendRequestError: action.payload.error,
        awaitingSendFriendRequest: false,
      };

    case (LOAD_FRIEND_REQUESTS_SENT):
      return {
        ...state,
        friendRequestsSent: action.payload.friendRequestsSent,
      };

    case (RESPOND_TO_FRIEND_REQUEST_START):
      return {
        ...state,
        awaitingRespondToFriendRequest: true,
        respondToFriendRequestError: '',
      };

    case (RESPOND_TO_FRIEND_REQUEST_FAILURE):
      return {
        ...state,
        awaitingRespondToFriendRequest: true,
        respondToFriendRequestError: action.payload.error,
      };

    case (ACCEPT_FRIEND_REQUEST):
      return {
        ...state,
        awaitingRespondToFriendRequest: false,
        friends: action.payload.friends,
        friendRequests: action.payload.friendRequests,
      };

    case (REJECT_FRIEND_REQUEST):
      return {
        ...state,
        awaitingRespondToFriendRequest: false,
        friendRequests: action.payload.friendRequests,
      };

    case (DELETE_FRIEND_START):
      return {
        ...state,
        awaitingDeleteFriend: true,
        deleteFriendError: '',
      };

    case (DELETE_FRIEND_SUCCESS):
      return {
        ...state,
        deleteFriendError: '',
        awaitingDeleteFriend: false,
        friends: action.payload.friends,
      };

    case (DELETE_FRIEND_FAILURE):
      return {
        ...state,
        deleteFriendError: action.payload.error,
        awaitingDeleteFriend: false,
      };

    case (LOGOUT):
      return { ...initialState };

    default:
      return state;
  }
};
