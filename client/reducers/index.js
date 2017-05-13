import history from './history';
import messages from './messages';
import users from './users';
import user from './user';

import { combineReducers } from 'redux';

const reducer = combineReducers({
    history,
    messages,
    users,
    user: user
});

export default reducer;