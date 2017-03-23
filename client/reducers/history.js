import { GET_HISTORY } from '../actions/actions';

const initialState = [];

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_HISTORY:
      return Object.values(action.history);
    default:
      return state;
  }
}

export default reducer;