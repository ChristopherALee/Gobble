import * as SessionApiUtil from "../../util/session/session_api_util";
import * as UserApiUtil from "../../util/users/users_api_util";
import { showLoading, hideLoading } from "../ui/menu_actions";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_SIGNUP_ERRORS = "RECEIVE_SIGNUP_ERRORS";
export const DELETE_ERRORS = "DELETE_ERRORS";
export const RECEIVE_USER_ONLINE_STATUS = "RECEIVE_USER_ONLINE_STATUS";
export const LOG_OUT = "LOG_OUT";

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const receiveSignUpErrors = errors => {
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

export const receiveUserOnlineStatus = user => {
  return {
    type: RECEIVE_USER_ONLINE_STATUS,
    user
  };
};

export const deleteAllErrors = () => dispatch => {
  return dispatch(deleteErrors());
};

export const signUp = user => dispatch => {
  dispatch(showLoading());

  return SessionApiUtil.signUp(user).then(
    user => {
      dispatch(receiveCurrentUser(user));
      dispatch(hideLoading());
      return user;
    },
    errors => {
      dispatch(receiveSignUpErrors(errors.responseJSON));
      dispatch(hideLoading());
      return errors;
    }
  );
};

export const login = user => dispatch => {
  dispatch(showLoading());

  return SessionApiUtil.login(user).then(
    currentUser => {
      const actions = () => {
        dispatch(hideLoading());
      };

      setTimeout(actions, 2000);

      dispatch(receiveCurrentUser(currentUser));
      return currentUser;
    },
    errors => {
      dispatch(receiveErrors(errors.responseJSON));
      dispatch(hideLoading());
      return errors;
    }
  );
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(response => {
    dispatch(resetState());
    dispatch(receiveCurrentUser(null));
    return response;
  });
};

export const fetchCurrentUser = userId => dispatch => {
  return UserApiUtil.fetchSingleUser(userId).then(user => {
    dispatch(receiveCurrentUser(user));
    return user;
  });
};

export const updateUser = user => dispatch => {
  return UserApiUtil.updateUser(user).then(user => {
    dispatch(receiveCurrentUser(user));
    return user;
  });
};

export const updateUserOnlineStatus = user => dispatch => {
  return UserApiUtil.updateUser(user).then(user => {
    dispatch(receiveUserOnlineStatus(user));
    return user;
  });
};
