import { combineReducers } from 'redux';
import userReducer from './user/user_reducer';
import channelReducer from './channel/channel_reducer';

const entitiesReducer = combineReducers({
  users: userReducer,
  channels: channelReducer,
});

export default entitiesReducer;
