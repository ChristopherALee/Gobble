import * as MessageApiUtil from '../../util/messages/message_api_util';

export const RECEIVE_ALL_MESSAGES = 'RECEIVE_ALL_MESSAGES';
export const RECEIVE_SINGLE_MESSAGE = 'RECEIVE_SINGLE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

const receiveAllMessages = (messages) => {
  return {
    type: RECEIVE_ALL_MESSAGES,
    messages
  };
};

const receiveSingleMessage = (message) => {
  return {
    type: RECEIVE_SINGLE_MESSAGE,
    message
  };
};

const deleteMessage = (id) => {
  return {
    type: DELETE_MESSAGE,
    messageId: id
  };
};

export const fetchAllMessages = () => dispatch => {
  return (
    MessageApiUtil.fetchAllMessages().then(
      (messages) => {
        dispatch(receiveAllMessages(messages));
        return messages;
      }
    )
  );
};

export const fetchSingleMessage = (message) => dispatch => {
  return (
    MessageApiUtil.fetchSingleMessage(message).then(
      (message) => {
        dispatch(receiveSingleMessage(message));
        return message;
      }
    )
  );
};

export const createMessage = (message) => dispatch => {
  return (
    MessageApiUtil.createMessage(message).then(
      (message) => {
        dispatch(receiveSingleMessage(message));
        return message;
      }
    )
  );
};

export const updateMessage = (message) => dispatch => {
  return (
    MessageApiUtil.updateMessage(message).then(
      (message) => {
        dispatch(receiveSingleMessage(message));
        return message
      }
    )
  );
};

export const destroyMessage = (id) => dispatch => {
  return (
    MessageApiUtil.destroyMessage(id).then(
      (message) => {
        dispatch(deleteMessage(message.id));
        return message;
      }
    )
  );
};
