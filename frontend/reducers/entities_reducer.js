import { combineReducers } from 'redux';
import userReducer from './user/user_reducer';
import channelReducer from './channel/channel_reducer';
import messageReducer from './message/message_reducer';

const entitiesReducer = combineReducers({
  users: userReducer,
  channels: channelReducer,
  messages: messageReducer,
});

export default entitiesReducer;
