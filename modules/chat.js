"use strict";
const socketIo = require('socket.io');

const UserService = require('../services/UsersService');
const userService = new UserService();

const chat = (server) => {
    const io = socketIo(server);

    io.on('connection', function(socket){
        console.log('a user connected');

        socket.on('join', (name) => {
            userService.addUser({
                id: socket.id,
                name
            });

            io.emit('update', {
                users: userService.getAllUsers()
            });

            socket.emit('setId', {
                id: socket.id
            })
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
        });
    });
}

module.exports = chat;