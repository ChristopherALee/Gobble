import {
  RECEIVE_ALL_DIRECT_MESSAGE_CHANNELS,
  RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL,
  RECEIVE_DIRECT_MESSAGE_CHANNEL_MESSAGES
} from "../../actions/direct_messaging/direct_message_channel_actions";
import {
  RECEIVE_ALL_DIRECT_MESSAGE_CHANNEL_MEMBERSHIPS,
  RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP,
  REMOVE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP
} from "../../actions/direct_messaging/direct_message_channel_membership_actions";
import {
  RECEIVE_SINGLE_DIRECT_MESSAGE,
  REMOVE_DIRECT_MESSAGE
} from "../../actions/direct_messaging/direct_message_actions";
import { LOG_OUT } from "../../actions/session/session_actions";

const directMessagingChannelsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_DIRECT_MESSAGE_CHANNELS:
      newState = Object.assign({}, state, action.channels);
      return newState;
    case RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL:
      newState = Object.assign({}, state, {
        [action.channel.id]: action.channel
      });
      return newState;
    case RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP:
      newState = Object.assign({}, state);
      newState[action.membership.channelId].members.push(
        action.membership.memberName
      );
      return newState;
    case REMOVE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP:
      newState = Object.assign({}, state);
      let newMembers = newState[action.membership.channelId].members.filter(
        member => member !== action.membership.memberName
      );
      newState[action.membership.channelId].members = newMembers;
      return newState;
    case RECEIVE_SINGLE_DIRECT_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.direct_message_channel_id].directMessages.push(
        action.message.id
      );
      return newState;
    case REMOVE_DIRECT_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.channelId].messages = newState[
        action.message.channelId
      ].messages.filter(message => message !== action.message.id);
      return newState;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default directMessagingChannelsReducer;
