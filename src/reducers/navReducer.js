import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_CURRENT_ROUTE,
} from '../actions/types';
import { NavigationActions } from 'react-navigation';
import { MainNav } from '../navigation/MainNav';

const initialState = MainNav.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  const nextState = MainNav.router.getStateForAction(action, state);
  
  return nextState || state;
};
