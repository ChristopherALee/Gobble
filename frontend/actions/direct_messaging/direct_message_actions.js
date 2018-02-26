import * as DirectMessageApiUtil from "../../util/direct_messages/direct_message_api_util";

export const RECEIVE_ALL_DIRECT_MESSAGES = "RECEIVE_ALL_DIRECT_MESSAGES";
export const RECEIVE_SINGLE_DIRECT_MESSAGE = "RECEIVE_SINGLE_DIRECT_MESSAGE";
export const REMOVE_DIRECT_MESSAGE = "REMOVE_DIRECT_MESSAGE";

const receiveAllDirectMessages = messages => {
  return {
    type: RECEIVE_ALL_DIRECT_MESSAGES,
    messages
  };
};

const receiveSingleDirectMessage = message => {
  return {
    type: RECEIVE_SINGLE_DIRECT_MESSAGE,
    message
  };
};

const removeDirectMessage = message => {
  return {
    type: REMOVE_DIRECT_MESSAGE,
    message
  };
};

export const fetchAllDirectMessages = () => dispatch => {
  DirectMessageApiUtil.fetchAllDirectMessages().then(messages => {
    dispatch(receiveAllDirectMessages(messages));
    return messages;
  });
};

export const fetchSingleDirectMessage = id => dispatch => {
  DirectMessageApiUtil.fetchSingleDirectMessage(id).then(message => {
    dispatch(receiveSingleDirectMessage(message));
    return message;
  });
};

export const deleteDirectMessage = id => dispatch => {
  DirectMessageApiUtil.deleteDirectMessage(id).then(message => {
    dispatch(removeDirectMessage(message));
    return message;
  });
};
