import { GET_USERS } from '../actions/actions';

const initialState = [];

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
}

export default reducer;