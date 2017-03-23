import App from '../components/App/App';
import {connect} from 'react-redux';
import {getHistory, getMessage, getUsers, setIds} from '../actions/actions';

const mapStateToProps = state => ({
  history: state.mainState.history,
  messages: state.mainState.messages,
  users: state.mainState.users,
  myIds: state.mainState.myIds,
});

const mapDispatchToProps = dispatch => ({
  getHistory: (history) => dispatch(getHistory(history)),
  getMessage: (message) => dispatch(getMessage(message)),
  getUsers: (users) => dispatch(getUsers(users)),
  setIds: (id, name) => dispatch(setIds(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);