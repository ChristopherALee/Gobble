import {
  RENDER_MENU,
  REMOVE_MENU } from '../actions/ui/menu_actions';

const uiReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RENDER_MENU:
      newState = Object.assign({}, state, {menu: action.render});
      return newState;
    case REMOVE_MENU:
      newState = Object.assign({}, state, {menu: action.render});
      return newState;
    default:
      return state;
  }
};

export default uiReducer;
