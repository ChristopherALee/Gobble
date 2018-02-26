import * as DirectMessageChannelMembershipApiUtil from "../../util/direct_messages/direct_message_channel_membership";

export const RECEIVE_ALL_DIRECT_MESSAGE_CHANNEL_MEMBERSHIPS =
  "RECEIVE_ALL_DIRECT_MESSAGE_CHANNEL_MEMBERSHIPS";
export const RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP =
  "RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP";
export const DELETE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP =
  "DELETE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP";

const receiveAllDirectMessageChannelMemberships = memberships => {
  return {
    type: RECEIVE_ALL_DIRECT_MESSAGE_CHANNEL_MEMBERSHIPS,
    memberships
  };
};

const receiveSingleDirectMessageChannelMembership = membership => {
  return {
    type: RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP,
    membership
  };
};

const deleteDirectMessageChannelMembership = membership => {
  return {
    type: DELETE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP,
    membership
  };
};

export const fetchAllDirectMessageChannelMemberships = () => dispatch => {
  DirectMessageChannelMembershipApiUtil.fetchAllDirectMessageChannelMemberships().then(
    memberships => {
      dispatch(receiveAllDirectMessageChannelMemberships(memberships));
      return memberships;
    }
  );
};

export const fetchSingleDirectMessageChannelMembership = id => dispatch => {
  DirectMessageChannelMembershipApiUtil.fetchSingleDirectMessageChannelMembership(
    id
  ).then(membership => {
    dispatch(receiveSingleDirectMessageChannelMembership(membership));
    return membership;
  });
};

export const removeDirectMessageChannelMembership = id => dispatch => {
  DirectMessageChannelMembershipApiUtil.deleteDirectMessageChannelMembership(
    id
  ).then(membership => {
    dispatch(deleteDirectMessageChannelMembership(membership));
    return membership;
  });
};
