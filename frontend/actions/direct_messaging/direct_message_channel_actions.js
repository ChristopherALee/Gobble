import * as DirectMessageChannelApiUtil from "../../util/direct_messages/direct_message_channel_api_util";

export const RECEIVE_ALL_DIRECT_MESSAGE_CHANNELS =
  "RECEIVE_ALL_DIRECT_MESSAGE_CHANNELS";
export const RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL =
  "RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL";
export const RECEIVE_DIRECT_MESSAGE_CHANNEL_MESSAGES =
  "RECEIVE_DIRECT_MESSAGE_CHANNEL_MESSAGES";

const receiveAllDirectMessageChannels = channels => {
  return {
    type: RECEIVE_ALL_DIRECT_MESSAGE_CHANNELS,
    channels
  };
};

const receiveSingleDirectMessageChannel = channel => {
  return {
    type: RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL,
    channel
  };
};

const receiveDirectMessageChannelMessages = messages => {
  return {
    type: RECEIVE_DIRECT_MESSAGE_CHANNEL_MESSAGES,
    messages
  };
};

export const fetchAllDirectMessageChannels = () => dispatch => {
  return DirectMessageChannelApiUtil.fetchAllDirectMessageChannels().then(
    channels => {
      dispatch(receiveAllDirectMessageChannels(channels));
      return channels;
    }
  );
};

export const fetchSingleDirectMessageChannel = channel => dispatch => {
  return DirectMessageChannelApiUtil.fetchSingleDirectMessageChannel(
    channel
  ).then(channel => {
    dispatch(receiveSingleDirectMessageChannel(channel));
    return channel;
  });
};

export const fetchDirectMessageChannelMessages = id => dispatch => {
  return DirectMessageChannelApiUtil.fetchDirectMessageChannelMessages(id).then(
    channel => {
      dispatch(receiveDirectMessageChannelMessages(channel));
      return channel;
    }
  );
};

export const createDirectMessageChannel = channel => dispatch => {
  return DirectMessageChannelApiUtil.createDirectMessageChannel(channel).then(
    channel => {
      dispatch(receiveSingleDirectMessageChannel(channel));
      return channel;
    }
  );
};
