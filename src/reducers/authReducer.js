import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
} from '../actions/types';

const initialState = { user: null, token: null, loading: null };

export default (state = initialState, action) => {
  switch(action.type) {
    case (LOGIN_SUCCESS):
      return {
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };

    case (LOGIN_FAILURE):
      return {
        user: null,
        token: null,
        loading: false,
      };

    case (LOGIN_START):
      return { loading: true };

    default:
      return state;
  }
};
