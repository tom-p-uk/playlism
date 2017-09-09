import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
  UPDATE_LAST_LOGIN,
  LOGOUT,
} from '../actions/types';

const initialState = {
  user: undefined,
  authToken: undefined,
  awaitingAuth: false,
  error: '',
  loggedInViaJWT: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case (LOGIN_SUCCESS):
      return {
        ...state,
        user: action.payload.user,
        authToken: action.payload.authToken,
        awaitingAuth: false,
        error: '',
        loggedInViaJWT: action.payload.loggedInViaJWT,
      };

    case (LOGIN_FAILURE):
      return {
        ...state,
        user: null,
        authToken: null,
        awaitingAuth: false,
        error: action.payload.error,
      };

    case (LOGIN_START):
      return {
        ...state,
        awaitingAuth: true
      };

    case (LOGOUT):
      return {
        ...state,
        user: null,
        authToken: null,
        awaitingAuth: false,
      };

    default:
      return state;
  }
};
