import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getHistory, getMessage, getUsers, setIds} from './redux/actions.js';

import io from 'socket.io-client';
const socket = io.connect();

import styles from './App.scss';

import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';
import UsersList from './UsersList.jsx';
import History from './History.jsx';

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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: document.cookie.match(new RegExp('myid' + '=([^;]+)'))[0].substring(5) || 'none',
        }
    }

    componentDidMount() {
        socket.on('message', message => this.props.getMessage(message));
        socket.on('update', ({users}) => this.props.getUsers(users));
        socket.on('setId', (ids) => this.setId(ids));
        socket.on('history', ({history}) => this.props.getHistory(history));
        socket.emit('join', { name: this.state.name });
    }

    setId = (ids) => {
        const name = document.cookie.match(new RegExp('myid' + '=([^;]+)'))[0].substring(5) || 'none';
        this.props.setIds(ids.id, name);
    }

    handleMessageSubmit = (message) => {
        this.props.getMessage(message);
        socket.emit('message', message);
    }

    render() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        App room
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.props.users}
                        myId={this.props.myIds.id}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.props.messages}
                        />
                        <History history={this.props.history} />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.props.myIds.name}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);