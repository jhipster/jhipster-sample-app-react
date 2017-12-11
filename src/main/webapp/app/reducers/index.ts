import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import layout from './layout';
import authentication from './authentication';
import administration from './administration';
import userManagement from './user-management';

export default combineReducers({
  authentication,
  locale,
  layout,
  administration,
  userManagement,
  loadingBar
});
