import * as ChannelApiUtil from '../../util/channels/channel_api_util';

export const RECEIVE_ALL_CHANNELS = 'RECEIVE_ALL_CHANNELS';
export const RECEIVE_SINGLE_CHANNEL = 'RECEIVE_SINGLE_CHANNEL';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const RECEIVE_CHANNEL_MESSAGES = 'RECEIVE_CHANNEL_MESSAGES';

const receiveAllChannels = (channels) => {
  return {
    type: RECEIVE_ALL_CHANNELS,
    channels
  };
};

const receiveSingleChannel = (channel) => {
  return {
    type: RECEIVE_SINGLE_CHANNEL,
    channel
  };
};

const deleteChannel = (id) => {
  return {
    type: DELETE_CHANNEL,
    channelId: id
  };
};

const receiveChannelMessages = (messages) => {
  return {
    type: RECEIVE_CHANNEL_MESSAGES,
    messages
  };
};

export const fetchAllChannels = () => dispatch => {
  return (
    ChannelApiUtil.fetchAllChannels().then(
      (channels) => {
        dispatch(receiveAllChannels(channels));
        return channels;
      }
    )
  );
};

export const fetchSingleChannel = (id) => dispatch => {
  return (
    ChannelApiUtil.fetchSingleChannel(id).then(
      (channel) => {
        dispatch(receiveSingleChannel(channel));
        return channel;
      }
    )
  );
};

export const fetchChannelMessages = (id) => dispatch => {
  return (
    ChannelApiUtil.fetchSingleChannel(id).then(
      (channel) => {
        dispatch(receiveChannelMessages(channel));
        return channel;
      }
    )
  );
};

export const createChannel = (channel) => dispatch => {
  return (
    ChannelApiUtil.createChannel(channel).then(
      (channel) => {
        dispatch(receiveSingleChannel(channel));
        return channel;
      }
    )
  );
};

export const updateSingleChannel = (channel) => dispatch => {
  return (
    ChannelApiUtil.updateChannel(channel).then(
      (channel) => {
        dispatch(receiveSingleChannel(channel));
        return channel;
      }
    )
  );
};

export const removeChannel = (id) => dispatch => {
  return (
    ChannelApiUtil.deleteChannel(id).then(
      (channel) => {
        dispatch(deleteChannel(channel.id));
        return channel;
      }
    )
  );
};
