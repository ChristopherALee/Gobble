import { connect } from 'react-redux';
import ChannelDetail from './channel_detail';

const mapStateToProps = (state, ownProps) => {
  let currentChannel;
  let currentChannelMemberNames;
  if (ownProps.location.pathname.slice(10) !== "") {
    let currentChannelName = ownProps.location.pathname.slice(10);
    currentChannel = state.entities.channels[currentChannelName];
    currentChannelMemberNames = currentChannel.members;
  }

  return {
    currentChannel: currentChannel,

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetail);
