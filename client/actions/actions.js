export const GET_HISTORY = 'GET_HISTORY';
export const GET_MESSAGE = 'GET_MESSAGE';
export const GET_USERS = 'GET_USERS';
export const SET_IDS = 'SET_IDS';


export const getHistory = history => ({
  type: GET_HISTORY,
  history
});

export const getMessage = message => ({
  type: GET_MESSAGE,
  message
});

export const getUsers = users => ({
  type: GET_USERS,
  users
});

export const setIds = (id, name) => ({
  type: SET_IDS,
  id,
  name
});