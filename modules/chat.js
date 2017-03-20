"use strict";
const socketIo = require('socket.io');

const UserService = require('../services/UsersService');
const userService = new UserService();

const firebase = require('./firebaseApi');
firebase.init();

const chat = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        socket.on('join', ({name, room}) => {
            userService.addUser({
                id: socket.id,
                name,
                room
            });

            socket.join(room);

            io.in(room).emit('update', {
                users: userService.getAllUsersInRoom(room)
            });

            socket.emit('setId', {
                id: socket.id
            });

            if (room === 'room0') {
                firebase.getHistory((history) => {
                    socket.emit('history', {
                        history
                    });
                });
            }
        });

        socket.on('disconnect', () => {
            const room = userService.getUserRoom(socket.id);
            userService.removeUser(socket.id);
            socket.broadcast.to(room).emit('update', {
                users: userService.getAllUsersInRoom(room)
            });
        });

        socket.on('message', ({message}) => {
            const room = userService.getUserRoom(socket.id);
            const {name} = userService.getUserById(socket.id);
            socket.broadcast.to(room).emit('message', {
                text: message.text,
                from: name
            });
            if (room === 'room0') firebase.saveMessage(name, message.text);
        });
    });
};

module.exports = chat;