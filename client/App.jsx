import React, { Component } from 'react';
import io from 'socket.io-client';

import styles from './App.scss';

import MessageForm from './MessageForm.jsx';
import MessageList from './MessageList.jsx';
import UsersList from './UsersList.jsx';
import UserForm from './UserForm.jsx';

const socket = io.connect('http://localhost:3000');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            messages: [],
            text: '',
            name: '',
            myId: ''
        }
    }

    componentDidMount() {
        socket.on('message', message => this.messageRecieve(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
        socket.on('setId', ({id}) => this.setId(id));
    }

    setId = (myId) => {
        this.setState({myId});
    }

    messageRecieve = (message) => {
        let messages = [message, ...this.state.messages];
        this.setState({messages});
    }

    chatUpdate = (users) => {
        this.setState({users});
    }

    handleMessageSubmit = (message) => {
        let messages = [message, ...this.state.messages];
        this.setState({messages});
        socket.emit('message', message);
    }

    handleUserSubmit = (name) => {
        this.setState({name});
        socket.emit('join', name);
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }

    renderLayout() {
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
                        users={this.state.users}
                        myId={this.state.myId}
                    />
                    <div className={styles.MessageWrapper}>
                        <MessageList
                            messages={this.state.messages}
                        />
                        <MessageForm
                            onMessageSubmit={message => this.handleMessageSubmit(message)}
                            name={this.state.name}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm() {
        return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)} />)
    }
}

export default App;