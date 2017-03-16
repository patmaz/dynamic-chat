"use strict";
const socketIo = require('socket.io');
const uuidV1 = require('uuid/v1');

const UserService = require('../services/UsersService');
const userService = new UserService();

import {getMessages, postMessage} from './firebaseSetup';

// @WARNING: PSEUDOCODE

const chat = (server) => {
    const io = socketIo(server);

    const thatLogic = (socket) => {

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

            getMessages((history) => {
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
            postMessage(name, message.text);
        });
    }

    // custom room
    const createRoom = (chatRoomId) => {
        var news = io
            .of(`/${chatRoomId}`)
            .on('connection', thatLogic);
    }

    // main room
    io.on('connection', thatLogic);

    return {createRoom};
};

module.exports = chat;