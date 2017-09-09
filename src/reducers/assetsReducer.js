import {
  DOWNLOAD_ASSETS_START,
  DOWNLOAD_ASSETS_SUCCESS,
  DOWNLOAD_ASSETS_FAILURE,
} from '../actions/types';

const initialState = {
  awaitingAssets: false,
  img: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case (DOWNLOAD_ASSETS_START):
      return {
        ...state,
        awaitingAssets: true,
      };

    case (DOWNLOAD_ASSETS_SUCCESS):
      return {
        ...state,
        awaitingAssets: false,
        img: action.payload,
      };

    case (DOWNLOAD_ASSETS_FAILURE):
      return {
        ...state,
        awaitingAssets: false,
      };

    default:
      return state;
  }
};
