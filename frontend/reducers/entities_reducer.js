import { combineReducers } from "redux";
import userReducer from "./user/user_reducer";
import channelReducer from "./channel/channel_reducer";
import messageReducer from "./message/message_reducer";
import directMessagingReducer from "./direct_messaging/direct_messaging_reducer";

const entitiesReducer = combineReducers({
  users: userReducer,
  channels: channelReducer,
  messages: messageReducer,
  directMessaging: directMessagingReducer
});

export default entitiesReducer;
