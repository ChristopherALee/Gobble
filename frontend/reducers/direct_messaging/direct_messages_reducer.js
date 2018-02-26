import {
  RECEIVE_ALL_DIRECT_MESSAGES,
  RECEIVE_SINGLE_DIRECT_MESSAGE,
  REMOVE_DIRECT_MESSAGE
} from "../../actions/direct_messaging/direct_message_actions";
import { RECEIVE_DIRECT_MESSAGE_CHANNEL_MESSAGES } from "../../actions/direct_messaging/direct_message_channel_actions";
import { LOG_OUT } from "../../actions/session/session_actions";

const directMessagesReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_DIRECT_MESSAGES:
      newState = Object.assign({}, state, action.messages);
      return newState;
    case RECEIVE_SINGLE_DIRECT_MESSAGE:
      newState = Object.assign({}, state, {
        [action.message.id]: action.message
      });
      return newState;
    case REMOVE_DIRECT_MESSAGE:
      newState = Object.assign({}, state);
      delete newState[action.messageId];
      return newState;
    case RECEIVE_DIRECT_MESSAGE_CHANNEL_MESSAGES:
      newState = Object.assign({}, state, action.messages);
      return newState;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default directMessagesReducer;
