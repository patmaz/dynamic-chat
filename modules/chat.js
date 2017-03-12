"use strict";
const socketIo = require('socket.io');
const firebase = require('firebase');
const uuidV1 = require('uuid/v1');

const UserService = require('../services/UsersService');
const userService = new UserService();
const config = require('../config');

let firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId
  };
firebase.initializeApp(firebaseConfig);

const writeMsg = (name, text) => {
    firebase.database()
            .ref('msgs/' + Date.now())
            .set({
                username: name,
                text: text,
                date: (new Date()).toString(),
                id: uuidV1()
            });
}

const readData = (cb) => {
    firebase.database()
                .ref('msgs/')
                .once('value')
                .then(function(snapshot) {
                    cb(snapshot.val());
                });
}

const chat = (server) => {
    const io = socketIo(server);

    io.on('connection', function(socket){

        socket.on('join', ({name}) => {
            userService.addUser({
                id: socket.id,
                name
            });

            io.emit('update', {
                users: userService.getAllUsers()
            });

            socket.emit('setId', {
                id: socket.id
            });

            readData((history) => {
                socket.emit('history', {
                    history
                });
            });
        });

        socket.on('disconnect', () => {
            userService.removeUser(socket.id);
            socket.broadcast.emit('update', {
                users: userService.getAllUsers()
            });
        });

        socket.on('message', (message) => {
            const {name} = userService.getUserById(socket.id);
            socket.broadcast.emit('message', {
                text: message.text,
                from: name
            });
            writeMsg(name, message.text);
        });
    });
};

module.exports = chat;