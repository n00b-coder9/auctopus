import { combineReducers } from 'redux';
import user from './user_reducer';
import drawer from './drawer_reducer';
import snackbar from './snackbar_reducer';
const rootReducer = combineReducers({
  user,
  drawer,
  snackbar,
});

export default rootReducer;
