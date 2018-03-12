import { connect } from "react-redux";
import ChannelDetail from "./channel_detail";

const mapStateToProps = (state, ownProps) => {
  let currentChannelName = ownProps.location.pathname.slice(10);
  let allChannels = Object.values(state.entities.channels);
  let currentChannel;
  let currentChannelMemberNames;
  let currentChannelMembers;
  if (allChannels.length !== 0 && ownProps.location.pathname.slice(10) !== "") {
    currentChannel = state.entities.channels[currentChannelName];
    currentChannelMemberNames = currentChannel.members;
    currentChannelMembers = Object.values(state.entities.users).filter(user =>
      currentChannelMemberNames.includes(user.username)
    );
  }

  let currentUser;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
  }

  return {
    currentChannel: currentChannel,
    currentChannelMembers: currentChannelMembers,
    currentUser: currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);
