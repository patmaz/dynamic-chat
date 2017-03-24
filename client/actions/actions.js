export const GET_HISTORY = 'GET_HISTORY';
export const getHistory = (history) => {
    return {
        type: GET_HISTORY,
        history
    }
}

export const GET_MESSAGE = 'GET_MESSAGE';
export const getMessage = (message) => {
    return {
        type: GET_MESSAGE,
        message
    }
}

export const GET_USERS = 'GET_USERS';
export const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const SET_IDS = 'SET_IDS';
export const setIds = (id, name) => {
    return {
        type: SET_IDS,
        id,
        name
    }
}