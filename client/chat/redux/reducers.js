import {GET_HISTORY, GET_MESSAGE, GET_USERS, HANDLE_CURRENT_MESSAGE_TXT, SET_IDS} from './actions';

const initialState = {
    history: [],
    messages: [],
    users: [],
    currentMessageText: '',
    myIds: {id: '', name: ''}
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_HISTORY:
            let newHistory = [];
            const loadHistory = (history) => {
                for (let property in history) {
                    if (history.hasOwnProperty(property)) {
                        newHistory = [history[property], ...newHistory];
                    }
                }
            }
            loadHistory(action.history);
            return {
                history: newHistory,
                messages: state.messages,
                users: state.users,
                currentMessageText: state.currentMessageText,
                myIds: state.myIds
            };
        case GET_MESSAGE:
            return {
                messages: [action.message, ...state.messages],
                history: state.history,
                users: state.users,
                currentMessageText: state.currentMessageText,
                myIds: state.myIds
            }
        case GET_USERS:
            return {
                messages: state.messages,
                history: state.history,
                users: action.users,
                currentMessageText: state.currentMessageText,
                myIds: state.myIds
            }
        case HANDLE_CURRENT_MESSAGE_TXT:
            return {
                messages: state.messages,
                history: state.history,
                users: state.users,
                currentMessageText: action.txt,
                myIds: state.myIds
            }
        case SET_IDS:
            return {
                messages: state.messages,
                history: state.history,
                users: state.users,
                currentMessageText: state.currentMessageText,
                myIds: {id: action.id, name: action.name}
            }
        default: return state;
    }
}

export default reducer;