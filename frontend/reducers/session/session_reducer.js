import { RECEIVE_CURRENT_USER, LOG_OUT } from '../../actions/session/session_actions';
import { RECEIVE_SINGLE_USER } from '../../actions/user/user_actions';

const sessionReducer = (state = {currentUser: null}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = Object.assign({}, state, {currentUser: action.currentUser});
      return newState;
    case RECEIVE_SINGLE_USER:
      if (state.currentUser.username === action.user.username) {
        newState = Object.assign({}, state, {currentUser: action.user});
        return newState;
      }
      break;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
