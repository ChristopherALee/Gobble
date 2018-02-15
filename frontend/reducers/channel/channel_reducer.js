import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_SINGLE_CHANNEL,
  DELETE_CHANNEL } from '../../actions/channel/channel_actions';
import {
  RECEIVE_ALL_MEMBERSHIPS,
  RECEIVE_SINGLE_MEMBERSHIP,
  DELETE_MEMBERSHIP } from '../../actions/membership/membership_actions';
  import {
    RECEIVE_SINGLE_MESSAGE,
    DELETE_MESSAGE } from '../../actions/message/message_actions';
import { LOG_OUT } from '../../actions/session/session_actions';

const channelReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      newState = Object.assign({}, state, action.channels);
      return newState;
    case RECEIVE_SINGLE_CHANNEL:
      newState = Object.assign({}, state, {[action.channel.name]: action.channel});
      return newState;
    case DELETE_CHANNEL:
      newState = Object.assign({}, state);
      delete newState[action.channel.name];
      return newState;
    case RECEIVE_SINGLE_MEMBERSHIP:
      newState = Object.assign({}, state);
      newState[action.membership.channelName].members.push(action.membership.userId);
      return newState;
    case DELETE_MEMBERSHIP:
      newState = Object.assign({}, state);
      let newMembers = newState[action.membership.channelName].members.filter(
        (member) => member !== action.membership.memberName
      );
      newState[action.membership.channelName].members = newMembers;
      return newState;
    case LOG_OUT:
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default channelReducer;
