import { connect } from "react-redux";
import DirectMessages from "./direct_messages";
import {
  fetchSingleDirectMessage,
  createDirectMessage,
  deleteDirectMessage
} from "../../../actions/direct_messaging/direct_message_actions";
import {
  fetchDirectMessageChannelMessages,
  fetchSingleDirectMessageChannel
} from "../../../actions/direct_messaging/direct_message_channel_actions";
import { fetchCurrentUser } from "../../../actions/session/session_actions";
import { fetchSingleUser } from "../../../actions/user/user_actions";
import { hideMenu } from "../../../actions/ui/menu_actions";

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
  }

  let currentDmChannelId = ownProps.location.pathname.slice(13);

  let currentDmChannel, messages, memberCount, membership;
  if (
    state.entities.directMessaging.directMessagingChannels[currentDmChannelId]
  ) {
    currentDmChannel =
      state.entities.directMessaging.directMessagingChannels[
        currentDmChannelId
      ];

    memberCount = currentDmChannel.members.length;

    membership = currentUser.directMessageMemberships.filter(membership => {
      return membership["channelId"] === currentDmChannel.id;
    });
    let messageIds = currentDmChannel.directMessages;

    if (messageIds) {
      messages = Object.values(
        state.entities.directMessaging.directMessagingMessages
      ).filter(message => {
        return Object.values(messageIds).includes(message.id);
      });
    }
  }

  return {
    currentUser,
    currentDmChannel,
    membership,
    messages,
    memberCount,
    allUsers: Object.values(state.entities.users),
    gobbleMenuShown: state.ui.menu
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSingleDirectMessage: id => dispatch(fetchSingleDirectMessage(id)),
    createDirectMessage: message => dispatch(createDirectMessage(message)),
    deleteDirectMessage: id => dispatch(deleteDirectMessage(id)),
    fetchDirectMessageChannelMessages: id =>
      dispatch(fetchDirectMessageChannelMessages(id)),
    fetchSingleDirectMessageChannel: channel =>
      dispatch(fetchSingleDirectMessageChannel(channel)),
    fetchCurrentUser: userId => dispatch(fetchCurrentUser(userId)),
    fetchSingleUser: user => dispatch(fetchSingleUser(user)),
    hideMenu: () => dispatch(hideMenu())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessages);
