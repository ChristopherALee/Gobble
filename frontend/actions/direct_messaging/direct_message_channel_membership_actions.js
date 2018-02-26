import * as DirectMessageChannelMembershipApiUtil from "../../util/direct_messages/direct_message_channel_membership_api_util";

export const RECEIVE_ALL_DIRECT_MESSAGE_CHANNEL_MEMBERSHIPS =
  "RECEIVE_ALL_DIRECT_MESSAGE_CHANNEL_MEMBERSHIPS";
export const RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP =
  "RECEIVE_SINGLE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP";
export const REMOVE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP =
  "REMOVE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP";

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

const removeDirectMessageChannelMembership = membership => {
  return {
    type: REMOVE_DIRECT_MESSAGE_CHANNEL_MEMBERSHIP,
    membership
  };
};

export const fetchAllDirectMessageChannelMemberships = () => dispatch => {
  return DirectMessageChannelMembershipApiUtil.fetchAllDirectMessageChannelMemberships().then(
    memberships => {
      dispatch(receiveAllDirectMessageChannelMemberships(memberships));
      return memberships;
    }
  );
};

export const fetchSingleDirectMessageChannelMembership = id => dispatch => {
  return DirectMessageChannelMembershipApiUtil.fetchSingleDirectMessageChannelMembership(
    id
  ).then(membership => {
    dispatch(receiveSingleDirectMessageChannelMembership(membership));
    return membership;
  });
};

export const createDirectMessageChannelMembership = membership => dispatch => {
  return DirectMessageChannelMembershipApiUtil.createDirectMessageChannelMembership(
    membership
  ).then(membership => {
    dispatch(receiveSingleDirectMessageChannelMembership(membership));
    return membership;
  });
};

export const deleteDirectMessageChannelMembership = id => dispatch => {
  return DirectMessageChannelMembershipApiUtil.deleteDirectMessageChannelMembership(
    id
  ).then(membership => {
    dispatch(deleteDirectMessageChannelMembership(membership));
    return membership;
  });
};
