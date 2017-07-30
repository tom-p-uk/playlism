import axios from 'axios';
import {
  ON_CHANGE_FRIENDS_SEARCHBAR,
  SEARCH_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_ERROR
} from './types';

// const URL = 'https://playlist.herokuapp.com/api';
const URL = 'http://localhost:3000/api';

export const onChangeFriendsSearchBar = text => {
  return {
    type: ON_CHANGE_FRIENDS_SEARCHBAR,
    payload: text
  }
};

export const searchFriends = (searchTerm, authToken) => async dispatch => {
  try {
    axios.defaults.headers.common['Authorization'] = authToken;
    const { data: { success } } = await axios.get(`${URL}/user/search/${encodeURI(searchTerm)}`);

    dispatch(searchFriendsSuccess(success.users))
  } catch (err) {
    console.log(err);

    if (err.response.data.error) {
      dispatch(searchFriendsError(err.response.data.error));
    }
  }
};

const searchFriendsSuccess = users => {
  return {
    type: SEARCH_FRIENDS_SUCCESS,
    payload: users
  };
};

const searchFriendsError = error => {
  return {
    type: SEARCH_FRIENDS_ERROR,
    payload: error
  };
};
