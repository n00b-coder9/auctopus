import { combineReducers } from 'redux';
import user from './user_reducer';
import drawer from './drawer_reducer';

const rootReducer = combineReducers({
  user,
  drawer,
});

export default rootReducer;
