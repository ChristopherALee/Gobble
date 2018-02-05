import { combineReducers } from 'redux';
import userReducer from './user/user_reducer';

const entitiesReducer = combineReducers({
  users: userReducer,
});

export default entitiesReducer;
