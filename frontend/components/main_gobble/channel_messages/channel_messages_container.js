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

  let currentChannelName = ownProps.location.pathname.slice(10);

  let currentChannel;
  let messages;
  let memberCount;
  let purpose;
  if (state.entities.channels[currentChannelName]) {
    currentChannel = state.entities.channels[currentChannelName];
    memberCount = currentChannel.members.length;
    purpose = currentChannel.purpose;

    let messageIds = currentChannel.messages;
    messages = Object.values(state.entities.messages).filter(
      (message) => {
        Object.values(messageIds).includes(message.id);
      }
    );
  }

  return {
    currentUser: currentUser,
    currentChannel: currentChannel,
    messages: messages,
    memberCount: memberCount,
    purpose: purpose,
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
