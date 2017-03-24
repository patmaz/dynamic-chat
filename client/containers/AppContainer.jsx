import App from '../components/App/App.jsx';
import {connect} from 'react-redux';
import {getHistory, getMessage, getUsers, setIds} from '../actions/actions.js';

const mapStateToProps = state => ({
    history: state.history,
    messages: state.messages,
    users: state.users,
    myIds: state.myIds,
});

const mapDispatchToProps = dispatch => ({
    getHistory: (history) => dispatch(getHistory(history)),
    getMessage: (message) => dispatch(getMessage(message)),
    getUsers: (users) => dispatch(getUsers(users)),
    setIds: (id, name) => dispatch(setIds(id, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);