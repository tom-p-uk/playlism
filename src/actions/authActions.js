import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_START,
} from './types';

export const loginSuccess = ({ user, token }) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user, token }
  };
};

export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
    payload: { user, token }
  };
};

export const loginStart = () => {
  return {
    type: LOGIN_START
  };
};
