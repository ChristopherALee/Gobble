import { connect } from "react-redux";
import ChannelSideBar from "./channel_sidebar";
import {
  fetchAllChannels,
  fetchSingleChannel,
  createChannel,
  updateSingleChannel,
  removeChannel,
  fetchChannelMessages
} from "../../../actions/channel/channel_actions";
import { createMembership } from "../../../actions/membership/membership_actions";
import {
  fetchAllDirectMessageChannels,
  fetchSingleDirectMessageChannel,
  fetchDirectMessageChannelMessages,
  createDirectMessageChannel
} from "../../../actions/direct_messaging/direct_message_channel_actions";
import { createDirectMessageChannelMembership } from "../../../actions/direct_messaging/direct_message_channel_membership_actions";
import {
  showMenu,
  hideMenu,
  showCreateChannelMenu,
  hideCreateChannelMenu,
  showChannelSearchMenu,
  hideChannelSearchMenu,
  showDirectMessageMenu,
  hideDirectMessageMenu
} from "../../../actions/ui/menu_actions";
import {
  logout,
  updateUser,
  fetchCurrentUser,
  updateUserOnlineStatus
} from "../../../actions/session/session_actions";
import {
  fetchAllUsers,
  fetchSingleUser
} from "../../../actions/user/user_actions";

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  let allUsers;
  let channels;
  let lastVisitedChannel;
  let directMessagingChannels;

  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
    allUsers = Object.values(state.entities.users);

    channels = Object.values(state.entities.channels).filter(channel => {
      return channel.members.includes(currentUser.username);
    });
    lastVisitedChannel = state.session.currentUser.lastVisitedChannel;

    directMessagingChannels = Object.values(
      state.entities.directMessaging.directMessagingChannels
    ).filter(dmChannel => {
      return dmChannel.members.includes(currentUser.username);
    });
  }

  let allChannels = Object.values(state.entities.channels);

  return {
    currentUser: currentUser,
    allUsers: allUsers,
    channels: channels,
    allChannels: allChannels,
    lastVisitedChannel: lastVisitedChannel,
    directMessagingChannels: directMessagingChannels,
    gobbleMenuShown: state.ui.menu,
    createChannelMenuShown: state.ui.createChannelMenu,
    channelSearchMenuShown: state.ui.channelSearchMenu,
    directMessageMenuShown: state.ui.directMessageMenu
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchSingleChannel: id => dispatch(fetchSingleChannel(id)),
    createChannel: channel => dispatch(createChannel(channel)),
    updateSingleChannel: channel => dispatch(updateSingleChannel(channel)),
    removeChannel: id => dispatch(removeChannel(id)),
    fetchChannelMessages: channel => dispatch(fetchChannelMessages(channel)),
    createMembership: membership => dispatch(createMembership(membership)),
    fetchAllDirectMessageChannels: () =>
      dispatch(fetchAllDirectMessageChannels()),
    fetchSingleDirectMessageChannel: id =>
      dispatch(fetchSingleDirectMessageChannel(id)),
    fetchDirectMessageChannelMessages: channel =>
      dispatch(fetchDirectMessageChannelMessages(channel)),
    createDirectMessageChannel: channel =>
      dispatch(createDirectMessageChannel(channel)),
    createDirectMessageChannelMembership: membership =>
      dispatch(createDirectMessageChannelMembership(membership)),
    showMenu: () => dispatch(showMenu()),
    hideMenu: () => dispatch(hideMenu()),
    showCreateChannelMenu: () => dispatch(showCreateChannelMenu()),
    hideCreateChannelMenu: () => dispatch(hideCreateChannelMenu()),
    showChannelSearchMenu: () => dispatch(showChannelSearchMenu()),
    hideChannelSearchMenu: () => dispatch(hideChannelSearchMenu()),
    showDirectMessageMenu: () => dispatch(showDirectMessageMenu()),
    hideDirectMessageMenu: () => dispatch(hideDirectMessageMenu()),
    logout: () => dispatch(logout()),
    updateUser: user => dispatch(updateUser(user)),
    fetchCurrentUser: username => dispatch(fetchCurrentUser(username)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchSingleUser: user => dispatch(fetchSingleUser(user)),
    updateUserOnlineStatus: user => dispatch(updateUserOnlineStatus(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSideBar);
