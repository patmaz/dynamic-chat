import { GET_MESSAGE } from '../actions/actions';

const initialState = [];

function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_MESSAGE:
      return {
        messages: [action.message, ...state.messages],
      };
    default:
      return state;
  }
}

export default reducer;