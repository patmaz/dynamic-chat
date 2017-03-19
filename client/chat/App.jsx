import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getHistory, getMessage, getUsers, setIds} from './redux/actions.js';

import io from 'socket.io-client';

import styles from './App.scss';

import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';
import UsersList from './UsersList.jsx';
import History from './History.jsx';

const socket = io.connect('http://localhost:3030');

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

        this.room = window.location.href.split('?')[1] ? window.location.href.split('?')[1].split('=')[1] : 'room0';
    }

    componentDidMount() {
        socket.on('message', message => this.props.getMessage(message));
        socket.on('update', ({users}) => this.props.getUsers(users));
        socket.on('setId', (ids) => this.setId(ids));
        socket.on('history', ({history}) => this.props.getHistory(history));
        socket.emit('join', { name: this.state.name, room: this.room });
    }

    setId = (ids) => {
        const name = document.cookie.match(new RegExp('myid' + '=([^;]+)'))[0].substring(5) || 'none';
        this.props.setIds(ids.id, name);
    }

    handleMessageSubmit = (message) => {
        this.props.getMessage(message);
        socket.emit('message', {message});
    }

    render() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTitle}>
                        <a href="/logout">logout</a>
                    </div>
                    <div className={styles.AppRoom}>
                        CHAT ROOM
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