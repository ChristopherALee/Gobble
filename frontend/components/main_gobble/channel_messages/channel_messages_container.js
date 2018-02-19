import { connect } from 'react-redux';
import {
  fetchSingleMessage,
  createMessage,
  updateMessage,
  destroyMessage } from '../../../actions/message/message_actions';
import {
  createMembership,
  removeMembership } from '../../../actions/membership/membership_actions';
import { fetchCurrentUser } from '../../../actions/session/session_actions';
import { hideMenu } from '../../../actions/ui/menu_actions';
import ChannelMessages from './channel_messages';

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
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
    gobbleMenuShown: state.ui.menu
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleMessage: (message) => dispatch(fetchSingleMessage(message)),
    createMessage: (message) => dispatch(createMessage(message)),
    updateMessage: (message) => dispatch(updateMessage(message)),
    destroyMessage: (id) => dispatch(destroyMessage(id)),
    createMembership: (membership) => dispatch(createMembership(membership)),
    removeMembership: (membershipId) => dispatch(removeMembership(membershipId)),
    fetchCurrentUser: (userId) => dispatch(fetchCurrentUser(userId)),
    hideMenu: () => dispatch(hideMenu())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMessages);
