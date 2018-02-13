import { connect } from 'react-redux';
import ChannelSideBar from './channel_sidebar';
import {
  fetchAllChannels,
  fetchSingleChannel,
  createChannel,
  updateSingleChannel,
  removeChannel } from '../../../actions/channel/channel_actions';
import {
  showMenu,
  hideMenu,
  showCreateChannelMenu,
  hideCreateChannelMenu } from '../../../actions/ui/menu_actions';
import { logout } from '../../../actions/session/session_actions';

const mapStateToProps = (state, ownProps) => {
  let currentUser;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
  }

  return {
    currentUser: currentUser,
    channels: Object.values(state.entities.channels),
    gobbleMenuShown: state.ui.menu
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchSingleChannel: (id) => dispatch(fetchSingleChannel(id)),
    createChannel: (channel) => dispatch(createChannel(channel)),
    updateSingleChannel: (channel) => dispatch(updateSingleChannel(channel)),
    removeChannel: (id) => dispatch(removeChannel(id)),
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
