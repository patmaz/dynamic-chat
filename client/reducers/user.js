import { GET_USER_DATA } from '../actions/actions';

const initialState = {
    socketId: '',
    userData: {}
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER_DATA:
            return {socketId: action.user[0], userData: action.user[1]};
        default:
            return state;
    }
}

export default reducer;