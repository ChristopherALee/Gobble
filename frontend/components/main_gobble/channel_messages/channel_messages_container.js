import { connect } from 'react-redux';
import {
  fetchSingleMessage,
  createMessage,
  updateMessage,
  destroyMessage } from '../../../actions/message/message_actions';
import ChannelMessages from './channel_messages';

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser.username;
  }

  let currentChannel = ownProps.location.pathname.slice(10);

  let messages;
  if (state.entities.channels[currentChannel]) {
    let messageIds = state.entities.channels[currentChannel];
    messages = Object.values(state.entities.messages).filter(
      (message) => {
        Object.values(messageIds).includes(message.id);
      }
    );
  }

  return {
    currentUser: currentUser,
    currentChannel: currentChannel,
    messages: messages
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleMessage: (message) => dispatch(fetchSingleMessage(message)),
    createMessage: (message) => dispatch(createMessage(message)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    destroyMessage: (id) => dispatch(destroyMessage(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMessages);
