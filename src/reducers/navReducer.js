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

  if (nextState) {
    const getCurrentRouteRecursive = (routes, index) => {
      const route = routes[index];
      if (route.index === undefined) {
        return route.routeName;
      } else {
        return getCurrentRouteRecursive(route.routes, route.index);
      }
    };

    const currentRoute = getCurrentRouteRecursive(nextState.routes, nextState.index);
    nextState.currentRoute = currentRoute;
  }

  return nextState || state;
};
