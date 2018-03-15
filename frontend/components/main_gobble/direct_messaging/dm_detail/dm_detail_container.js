import { connect } from "react-redux";
import DirectMessageDetail from "./dm_detail";

const mapStateToProps = (state, ownProps) => {
  let currentDmChannelId = ownProps.location.pathname.slice(13);
  let allChannels = Object.values(
    state.entities.directMessaging.directMessagingChannels
  );
  let currentDmChannel, currentDmChannelMemberNames, currentDmChannelMembers;

  if (allChannels.length !== 0 && ownProps.location.pathname.slice(13) !== "") {
    currentDmChannel =
      state.entities.directMessaging.directMessagingChannels[
        currentDmChannelId
      ];
    currentDmChannelMemberNames = currentDmChannel.members;
    currentDmChannelMembers = Object.values(state.entities.users).filter(user =>
      currentDmChannelMemberNames.includes(user.username)
    );
  }

  let currentUser;
  if (state.session.currentUser) {
    currentUser = state.session.currentUser;
  }

  return {
    currentDmChannel,
    currentDmChannelMembers,
    currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DirectMessageDetail
);
