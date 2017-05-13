import App from '../components/App/App.jsx';
import {connect} from 'react-redux';
import {getHistory, getMessage, getUsers, getUserData} from '../actions/actions.js';

const mapStateToProps = state => ({
    history: state.history,
    messages: state.messages,
    users: state.users,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    getHistory: (history) => dispatch(getHistory(history)),
    getMessage: (message) => dispatch(getMessage(message)),
    getUsers: (users) => dispatch(getUsers(users)),
    getUserData: (socketId, user) => dispatch(getUserData(socketId, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);