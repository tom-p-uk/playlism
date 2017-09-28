import { NavigationActions } from 'react-navigation';
import {
  LOGOUT,
} from '../actions/types';
import { MainNav } from '../navigation/MainNav';

const initialState = MainNav.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  let nextState = MainNav.router.getStateForAction(action, state);

  if (nextState) {
    const currentRoute = getCurrentRouteRecursive(nextState.routes, nextState.index);
    nextState.currentRoute = currentRoute;
  }

  if (action.type === LOGOUT) {
    nextState = initialState;
  }

  return nextState || state;
};

const getCurrentRouteRecursive = (routes, index) => {
  const route = routes[index];
  if (route.index === undefined) {
    return route.routeName;
  } else {
    return getCurrentRouteRecursive(route.routes, route.index);
  }
};
