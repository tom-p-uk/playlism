import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
} from '../actions/types';

const initialState = { drawerIsOpen: false };

export default (state = initialState, action) => {
  switch(action.type) {
    case (OPEN_DRAWER):
      return { drawerIsOpen: true };

    case (CLOSE_DRAWER):
      return { drawerIsOpen: false };

    default:
      return state;
  }
};
