import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  UPDATE_LAST_LOGIN,
  LOGOUT,
} from '../actions/types';

const initialState = {
  user: null,
  authToken: null,
  loading: null,
  error: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case (LOGIN_SUCCESS):
      return {
        ...state,
        user: action.payload.user,
        authToken: action.payload.authToken,
        loading: false,
        error: '',
      };

    case (LOGIN_FAILURE):
      return {
        ...state,
        user: null,
        authToken: null,
        loading: false,
        error: action.payload.error,
      };

    case (LOGIN_START):
      return {
        ...state,
        loading: true
      };

    case (LOGOUT):
      return { ...initialState };

    default:
      return state;
  }
};
