import { connect } from 'react-redux';
import ChannelSideBar from './channel_sidebar';
import {
  fetchAllChannels,
  fetchSingleChannel,
  createChannel,
  updateSingleChannel,
  removeChannel } from '../../../actions/channel/channel_actions';
import { createMembership } from '../../../actions/membership/membership_actions';
import {
  showMenu,
  hideMenu,
  showCreateChannelMenu,
  hideCreateChannelMenu } from '../../../actions/ui/menu_actions';
import { logout } from '../../../actions/session/session_actions';

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  let channels;

  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
    channels = Object.values(state.entities.channels).filter(
      (channel) => {
        return (
          channel.members.includes(currentUser.username)
        );
      }
    );
  }

  return {
    currentUser: currentUser,
    channels: channels,
    gobbleMenuShown: state.ui.menu,
    createChannelMenuShown: state.ui.createChannelMenu
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchSingleChannel: (id) => dispatch(fetchSingleChannel(id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateSingleChannel: (channel) => dispatch(updateSingleChannel(channel)),
    removeChannel: (id) => dispatch(removeChannel(id)),
    createMembership: (membership) => dispatch(createMembership(membership)),
    showMenu: () => dispatch(showMenu()),
    hideMenu: () => dispatch(hideMenu()),
    showCreateChannelMenu: () => dispatch(showCreateChannelMenu()),
    hideCreateChannelMenu: () => dispatch(hideCreateChannelMenu()),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelSideBar);
