"use strict";
const express = require('express');
const http = require('http');

const authentication = require('./modules/authentication');
const chat = require('./modules/chat');

const app = express();
const server = http.createServer(app);

const port = 3030; //80 8000 3000 8080


//middle
app.use(express.static('public'));
app.use((req, res, next) => {
  res.status(404).send("upss, 404!");
});

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/start.html');
});

// @WARNING: PSEUDOCODE
// app.get('/chat/:chatRoomId', function() {
//   chat.createRoom(chatRoomId);
// });

authentication(app);
chat(server);

//listen
server.listen(port, () => {
  console.log(new Date() + ' >>>>>>>>> listening on: ' + port);
});
