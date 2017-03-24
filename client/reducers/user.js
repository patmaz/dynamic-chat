import { SET_IDS } from '../actions/actions';

const initialState = {
    id: '',
    name: ''
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_IDS:
            return {id: action.id, name: action.name}
        default:
            return state;
    }
}

export default reducer;