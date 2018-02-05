import {
  RECEIVE_SIGNUP_ERRORS,
  RECEIVE_CURRENT_USER,
  DELETE_ERRORS } from '../../actions/session/session_actions';

const signUpErrorsReducer = (state = { errors: [] }, action) => {
  let newState;
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SIGNUP_ERRORS:
      newState = Object.assign({}, state, {errors: action.errors});
      return newState;
    case RECEIVE_CURRENT_USER:
      newState = { errors: [] };
      return newState;
    case DELETE_ERRORS:
      newState = { errors: [] };
      return newState;
    default:
      return state;
  }
};

export default signUpErrorsReducer;
