import {GET_HISTORY} from '../actions/actions';

const initialState = []

const loadHistory = history => {
    let newHistory = [];
    for (let property in history) {
        if (history.hasOwnProperty(property)) {
            newHistory = [history[property], ...newHistory];
        }
    }
    return newHistory;
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_HISTORY:
            return loadHistory(action.history);
        default:
            return state;
    }
}

export default reducer;