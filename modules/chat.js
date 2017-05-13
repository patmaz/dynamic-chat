"use strict";
const socketIo = require('socket.io');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');

const UserService = require('../services/UsersService');
const userService = new UserService();

const config = require('../config');

const firebase = require('./firebaseApi');
firebase.init();

const chat = (server, redisClient) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        socket.on('join', ({room}) => {
            const sid = 'sess:' +
                cookieParser.signedCookie(
                    cookie.parse(socket.handshake.headers.cookie)['connect.sid'],
                    config.session.secret
                );

            const getUserAuthData = () => {
                return new Promise((resolve, reject) => {
                    redisClient.get(sid, (err, user) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(JSON.parse(user));
                    });
                });
            };

            getUserAuthData().then((user) => {
                userService.addUser({
                    id: socket.id,
                    name: user.passport.user.nickname,
                    room
                });

                socket.join(room);

                console.log('rooms', io['sockets']['adapter']['rooms']);
                console.log(socket.id, 'JOIN', userService.getUserRoom(socket.id));

                io.in(room).emit('update', {
                    users: userService.getAllUsersInRoom(room)
                });

                socket.emit('userData', {
                    socketId: socket.id,
                    user: user.passport.user
                });

                if (room === 'room0') {
                    firebase.getHistory((history) => {
                        socket.emit('history', {
                            history
                        });
                    });
                }
            }).catch((err) => {
                console.error(err);
            });
        });

        socket.on('disconnect', () => {
            const room = userService.getUserRoom(socket.id);
            console.log(socket.id, 'LEFT', room);
            console.log('rooms', io['sockets']['adapter']['rooms']);
            userService.removeUser(socket.id);
            socket.broadcast.to(room).emit('update', {
                users: userService.getAllUsersInRoom(room)
            });
        });

        socket.on('message', ({message}) => {
            const room = userService.getUserRoom(socket.id);
            console.log(socket.id, 'MESSAGE ', room);
            io.in(room).emit('message', {
                text: message.text,
                from: message.from,
                time: new Date().toString()
            });
            if (room === 'room0') firebase.saveMessage(message.from, message.text);
        });
    });
};

module.exports = chat;