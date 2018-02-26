import { combineReducers } from "redux";
import directMessagingChannelsReducer from "./direct_messaging_channels_reducer";
import directMessagesReducer from "./direct_messages_reducer";

const directMessagingReducer = combineReducers({
  directMessagingChannels: directMessagingChannelsReducer,
  directMessagingMessages: directMessagesReducer
});

export default directMessagingReducer;
