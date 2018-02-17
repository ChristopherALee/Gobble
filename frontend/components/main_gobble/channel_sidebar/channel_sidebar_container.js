import { connect } from 'react-redux';
import ChannelSideBar from './channel_sidebar';
import {
  fetchAllChannels,
  fetchSingleChannel,
  createChannel,
  updateSingleChannel,
  removeChannel,
  fetchChannelMessages } from '../../../actions/channel/channel_actions';
import { createMembership } from '../../../actions/membership/membership_actions';
import {
  showMenu,
  hideMenu,
  showCreateChannelMenu,
  hideCreateChannelMenu,
  showChannelSearchMenu,
  hideChannelSearchMenu } from '../../../actions/ui/menu_actions';
import {
  logout,
  updateUser } from '../../../actions/session/session_actions';

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  let channels;
  let lastVisitedChannel;

  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
    channels = Object.values(state.entities.channels).filter(
      (channel) => {
        return (
          channel.members.includes(currentUser.username)
        );
      }
    );
    lastVisitedChannel = state.session.currentUser.lastVisitedChannel;
  }

  let allChannels = Object.values(state.entities.channels);

  return {
    currentUser: currentUser,
    channels: channels,
    allChannels: allChannels,
    lastVisitedChannel: lastVisitedChannel,
    gobbleMenuShown: state.ui.menu,
    createChannelMenuShown: state.ui.createChannelMenu,
    channelSearchMenuShown: state.ui.channelSearchMenu
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchSingleChannel: (id) => dispatch(fetchSingleChannel(id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateSingleChannel: (channel) => dispatch(updateSingleChannel(channel)),
    removeChannel: (id) => dispatch(removeChannel(id)),
    fetchChannelMessages: (channel) => dispatch(fetchChannelMessages(channel)),
    createMembership: (membership) => dispatch(createMembership(membership)),
    showMenu: () => dispatch(showMenu()),
    hideMenu: () => dispatch(hideMenu()),
    showCreateChannelMenu: () => dispatch(showCreateChannelMenu()),
    hideCreateChannelMenu: () => dispatch(hideCreateChannelMenu()),
    showChannelSearchMenu: () => dispatch(showChannelSearchMenu()),
    hideChannelSearchMenu: () => dispatch(hideChannelSearchMenu()),
    logout: () => dispatch(logout()),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSideBar);
