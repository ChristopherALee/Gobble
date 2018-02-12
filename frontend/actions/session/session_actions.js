import * as SessionApiUtil from '../../util/session/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_SIGNUP_ERRORS = 'RECEIVE_SIGNUP_ERRORS';
export const DELETE_ERRORS = 'DELETE_ERRORS';
export const LOG_OUT = 'LOG_OUT';

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const receiveSignUpErrors = (errors) => {
  return {
    type: RECEIVE_SIGNUP_ERRORS,
    errors
  };
};

export const resetState = () => {
  return {
    type: LOG_OUT
  };
};

export const deleteErrors = () => {
  return {
    type: DELETE_ERRORS
  };
};

export const deleteAllErrors = () => dispatch => {
  return (
    dispatch(deleteErrors())
  );
};

export const signUp = user => dispatch => {
  return (
    SessionApiUtil.signUp(user).then(
      user => {
        return (
          dispatch(receiveCurrentUser(user))
        );
      },
      errors => {
        dispatch(receiveSignUpErrors(errors.responseJSON));
        return errors;
      }
    )
  );
};

export const login = user => dispatch => {

  return (
    SessionApiUtil.login(user).then(
      currentUser => {
        dispatch(receiveCurrentUser(currentUser));
        return currentUser;
      },
      errors => {
        dispatch(receiveErrors(errors.responseJSON));
        return errors;
      }
    )
  );
};

export const logout = () => dispatch => {
  return (
    SessionApiUtil.logout().then(
      (response) => {
        dispatch(resetState());
        dispatch(receiveCurrentUser(null));
        return response;
      }
    )
  );
};
