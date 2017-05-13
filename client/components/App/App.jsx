import React, { Component } from 'react';

import io from 'socket.io-client';

import styles from './App.scss';

import MessageForm from '../MessageForm/MessageForm.jsx';
import MessageList from '../MessageList/MessageList.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import History from '../History/History.jsx';

let socket;
if (process.env.NODE_ENV === 'development') {
    socket = io.connect('http://localhost:3030');
} else {
    socket = io.connect('');
}

class App extends Component {
    constructor(props) {
        super(props);

        this.room = window.location.href.split('?')[1] ? window.location.href.split('?')[1].split('=')[1] : 'room0';
    }

    componentDidMount() {
        socket.on('message', message => this.handleMessageGet(message));
        socket.on('update', ({users}) => this.props.getUsers(users));
        socket.on('userData', ({socketId, user}) => this.props.getUserData(socketId, user));
        socket.on('history', ({history}) => this.props.getHistory(history));
        socket.emit('join', { room: this.room });
    }

    handleMessageSubmit = (message) => {
        socket.emit('message', {message});
    };

    handleMessageGet = (message) => {
        this.props.getMessage(message);

        const messagesListContainer = document.getElementById('messagesList');
        if (messagesListContainer.clientHeight < messagesListContainer.scrollHeight) {
           messagesListContainer.scrollTop =  messagesListContainer.scrollHeight;
        }
    };

    render() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppLogout}>
                        <a href="/logout">logout</a>
                    </div>
                    <div className={styles.AppRoom}>
                        dynamic roomz chat
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList
                        users={this.props.users}
                        myId={this.props.user.socketId}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.props.messages}
                            name={this.props.user.userData.nickname || 'none'}
                        />
                        <History history={this.props.history} />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.props.user.userData.nickname || 'none'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default (App);