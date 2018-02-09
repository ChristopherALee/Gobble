import * as MembershipApiUtil from '../../util/memberships/membership_api_util';

export const RECEIVE_ALL_MEMBERSHIPS = 'RECEIVE_ALL_MEMBERSHIPS';
export const RECEIVE_SINGLE_MEMBERSHIP = 'RECEIVE_SINGLE_MEMBERSHIP';
export const DELETE_MEMBERSHIP = 'DELETE_MEMBERSHIP';

const receiveAllMemberships = (memberships) => {
  return {
    type: RECEIVE_ALL_MEMBERSHIPS,
    memberships
  };
};

const receiveSingleMembership = (membership) => {
  return {
    type: RECEIVE_SINGLE_MEMBERSHIP,
    membership
  };
};

const deleteMembership = (id) => {
  return {
    type: DELETE_MEMBERSHIP,
    membershipId: id
  };
};

export const fetchAllMemberships = () => dispatch => {
  return (
    MembershipApiUtil.fetchAllMemberships().then(
      (memberships) => {
        dispatch(receiveAllMemberships(memberships));
        return memberships;
      }
    )
  );
};

export const fetchSingleMembership = (id) => dispatch => {
  return (
    MembershipApiUtil.fetchSingleMembership(id).then(
      (membership) => {
        dispatch(receiveSingleMembership(membership));
        return membership;
      }
    )
  );
};

export const removeMembership = (id) => dispatch => {
  return (
    MembershipApiUtil.deleteMembership(id).then(
      (membership) => {
        dispatch(deleteMembership(membership.id));
        return membership;
      }
    )
  );
};
