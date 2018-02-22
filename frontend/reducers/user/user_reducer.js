import {
  RECEIVE_ALL_USERS,
  RECEIVE_SINGLE_USER } from '../../actions/user/user_actions';
import {
  LOG_OUT,
  RECEIVE_CURRENT_USER } from '../../actions/session/session_actions';

const userReducer = (state = {}, action) => {
  let newState;
  let authorName;

  switch (action.type) {
    case RECEIVE_ALL_USERS:
      newState = Object.assign({}, state, action.users);
      return newState;
    case RECEIVE_SINGLE_USER:
      newState = Object.assign({}, state, {[action.user.username]: action.user});
      return newState;
    case RECEIVE_CURRENT_USER:
      if (action.currentUser) {
        newState = Object.assign({}, state, {[action.currentUser.username]: action.currentUser});
      } else {
        newState = Object.assign({}, state);
      }
      
      return newState;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default userReducer;
