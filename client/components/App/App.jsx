import React, { Component } from 'react';

import io from 'socket.io-client';

import styles from './App.scss';

import MessageForm from '../MessageForm/MessageForm.jsx';
import MessageList from '../MessageList/MessageList.jsx';
import UsersList from '../UsersList/UsersList.jsx';
import History from '../History/History.jsx';

const socket = io.connect('http://localhost:3030');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: document.cookie.match(new RegExp('myid' + '=([^;]+)'))[0].substring(5) || 'none',
        };

        this.room = window.location.href.split('?')[1] ? window.location.href.split('?')[1].split('=')[1] : 'room0';
    }

    componentDidMount() {
        socket.on('message', message => this.props.getMessage(message));
        socket.on('update', ({users}) => this.props.getUsers(users));
        socket.on('setId', (ids) => this.setId(ids));
        socket.on('history', ({history}) => this.props.getHistory(history));
        socket.emit('join', { name: this.state.name, room: this.room });
    }

    getUserNameFromCookie = () =>
        document.cookie.match(new RegExp('myid' + '=([^;]+)'))[0].substring(5) || 'none';

    setId = (ids) => {
        const name = this.getUserNameFromCookie();
        this.props.setIds(ids.id, name);
    };

    handleMessageSubmit = (message) => {
        this.props.getMessage(message);
        socket.emit('message', {message});
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
                        myId={this.props.myIds.id}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.props.messages}
                            name={this.props.myIds.name}
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

export default App;