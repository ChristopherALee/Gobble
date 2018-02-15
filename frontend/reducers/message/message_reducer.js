import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_SINGLE_MESSAGE,
  DELETE_MESSAGE } from '../../actions/message/message_actions';
import { RECEIVE_CHANNEL_MESSAGES } from '../../actions/channel/channel_actions';
import { LOG_OUT } from '../../actions/session/session_actions';

const messageReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      newState = Object.assign({}, state, action.messages);
      return newState;
    case RECEIVE_SINGLE_MESSAGE:
      newState = Object.assign({}, state, {[action.message.id]: action.message});
      return newState;
    case DELETE_MESSAGE:
      newState = Object.assign({}, state);
      delete newState[action.messageId];
    case RECEIVE_CHANNEL_MESSAGES:
      newState = Object.assign({}, state, action.messages);
      return newState;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default messageReducer;
