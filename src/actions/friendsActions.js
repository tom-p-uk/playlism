import axios from 'axios';
import _ from 'lodash';
import {
  SEARCH_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_FAILURE,
  CLEAR_SEARCH_FRIENDS_RESULTS,
  SEARCH_FRIENDS_START,
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
} from './types';

const URL = 'http://localhost:3000/api';
// const URL = Platform.OS === 'android' ? 'http://192.168.0.14:3000/api' : 'http://localhost:3000/api';

export const searchFriends = (searchTerm, authToken) => async dispatch => {
  // dispatch(searchFriendsStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/user/search/${encodeURI(searchTerm)}`);

    dispatch(searchFriendsSuccess(success.users))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(searchFriendsFailure(err.response.data.error));
    }
  }
};

export const searchFriendsStart = () => {
return {
  type: SEARCH_FRIENDS_START
}};

const searchFriendsSuccess = users => {
  return {
    type: SEARCH_FRIENDS_SUCCESS,
    payload: { users }
  };
};

const searchFriendsFailure = error => {
  return {
    type: SEARCH_FRIENDS_FAILURE,
    payload: { error }
  };
};

export const clearSearchFriendsResults = () => {
  return {
    type: CLEAR_SEARCH_FRIENDS_RESULTS
  };
};


export const getFriends = authToken => async dispatch => {
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/user/friends`);

    dispatch(getFriendsSuccess(success.friends))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(getFriendsFailure(err.response.data.error));
    }
  }
};

const getFriendsStart = () => {
  return {
    type: GET_FRIENDS_START,
  };
};

const getFriendsSuccess = friends => {
  return {
    type: GET_FRIENDS_SUCCESS,
    payload: { friends }
  };
};

const getFriendsFailure = error => {
  return {
    type: GET_FRIENDS_FAILURE,
    payload: { error }
  };
};

export const getFriendRequests = authToken => async dispatch => {
  dispatch(getFriendRequestsStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/user/friendrequests`);

    dispatch(getFriendRequestsSuccess(success.friendRequests))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(getFriendRequestsFailure(err.response.data.error));
    }
  }
};

const getFriendRequestsStart = () => {
  return {
    type: GET_FRIEND_REQUESTS_START,
  };
};

const getFriendRequestsSuccess = friendRequests => {
  return {
    type: GET_FRIEND_REQUESTS_SUCCESS,
    payload: { friendRequests }
  };
};

const getFriendRequestsFailure = error => {
  return {
    type: GET_FRIEND_REQUESTS_FAILURE,
    payload: { error }
  };
};

export const checkUserFriendStatus = (user, friends, friendRequests, friendRequestsSent) => async dispatch => {
  const friendsIndex = _.findIndex(friends, obj => obj.user._id === user._id);
  const friendRequestsIndex = _.findIndex(friendRequests, obj => obj.user._id === user._id);
  const friendRequestsSentIndex = _.findIndex(friendRequestsSent, { user: user._id });

  if (friendsIndex !== -1) {
    dispatch(updateUserFriendStatus('friends'));
  } else if (friendRequestsIndex !== -1) {
    dispatch(updateUserFriendStatus('friendRequestReceived'));
  } else if (friendRequestsSentIndex !== -1) {
    dispatch(updateUserFriendStatus('friendRequestSent'));
  } else if (friendsIndex === -1 && friendRequestsSentIndex === -1) {
    dispatch(updateUserFriendStatus('notFriends'));
  }
};

const updateUserFriendStatus = userFriendStatus => {
  return {
    type: UPDATE_USER_FRIEND_STATUS,
    payload: { userFriendStatus }
  };
};

export const sendFriendRequest = (userId, authToken) => async dispatch => {
  dispatch(sendFriendRequestStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.put(`${URL}/user/friend/add`, { userId });

    dispatch(sendFriendRequestSuccess(success.friendRequestsSent))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(sendFriendRequestFailure(err.response.data.error));
    }
  }
};

const sendFriendRequestStart = () => {
  return {
    type: SEND_FRIEND_REQUEST_START,
  };
};

const sendFriendRequestSuccess = friendRequestsSent => {
  return {
    type: SEND_FRIEND_REQUEST_SUCCESS,
    payload: { friendRequestsSent }
  };
};

const sendFriendRequestFailure = error => {
  return {
    type: SEND_FRIEND_REQUEST_FAILURE,
    payload: { error }
  };
};

export const loadFriendRequestsSent = friendRequestsSent => {
  return {
    type: LOAD_FRIEND_REQUESTS_SENT,
    payload: { friendRequestsSent }
  };
};

export const respondToFriendRequest = (user, friends, friendRequests, authToken, accept) => async dispatch => {
  dispatch(respondToFriendRequestStart());
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.put(`${URL}/user/friend/acceptreject`, { accept, userId: user._id });

    if (accept) {
      dispatch(acceptFriendRequest(user, friends, friendRequests, success.friend));
    } else {
      dispatch(rejectFriendRequest(user, friendRequests));
    }

  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(respondToFriendRequestFailure(err.response.data.error))
    }
  }
};

const respondToFriendRequestStart = () => {
  return {
    type: RESPOND_TO_FRIEND_REQUEST_START
  };
};

const acceptFriendRequest = (user, friends, friendRequests, newFriend) => {
  const friendsUpdated = [...friends, newFriend];
  const friendRequestsFiltered = _.filter(friendRequests, obj => obj.user._id !== user._id);

  return {
    type: ACCEPT_FRIEND_REQUEST,
    payload: {
      friends: friendsUpdated,
      friendRequests: friendRequestsFiltered
    }
  };
};

const rejectFriendRequest = (user, friendRequests) => {
  const friendRequestsFiltered = _.filter(friendRequests, obj => obj.user._id !== user._id);
  return {
    type: REJECT_FRIEND_REQUEST,
    payload: { friendRequests: friendRequestsFiltered }
  };
};

const respondToFriendRequestFailure = error => {
  return {
    type: RESPOND_TO_FRIEND_REQUEST_FAILURE,
    payload: { error }
  };
};

export const deleteFriend = (userId, authToken) => async dispatch => {
  dispatch(deleteFriendStart())
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.put(`${URL}/user/friend/delete`, { userId });

    dispatch(deleteFriendSuccess(success.friends))

  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(deletFriendFailure(err.response.data.error));
    }
  }
};

const deleteFriendStart = () => {
  return {
    type: DELETE_FRIEND_START
  };
};

const deleteFriendSuccess = friends => {
  return {
    type: DELETE_FRIEND_SUCCESS,
    payload: { friends }
  };
};

const deletFriendFailure = error => {
  return {
    type: DELETE_FRIEND_FAILURE,
    payload: { error }
  };
};
