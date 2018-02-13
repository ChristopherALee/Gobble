import {
  RENDER_MENU,
  REMOVE_MENU,
  RENDER_CREATE_CHANNEL_MENU,
  REMOVE_CREATE_CHANNEL_MENU } from '../actions/ui/menu_actions';
import { LOG_OUT } from '../actions/session/session_actions';

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
    case RENDER_CREATE_CHANNEL_MENU:
      newState = Object.assign({}, state, {createChannelMenu: action.render});
      return newState;
    case REMOVE_CREATE_CHANNEL_MENU:
      newState = Object.assign({}, state, {createChannelMenu: action.render});
      return newState;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default uiReducer;
