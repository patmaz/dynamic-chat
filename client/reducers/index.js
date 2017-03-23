import history from './history';
import messages from './messages';
import users from './users';
import you from './you';

import { combineReducers } from 'redux';

const reducer = combineReducers({
  history,
  messages,
  users,
  myIds: you
});

export default reducer;