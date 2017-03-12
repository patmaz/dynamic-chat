"use strict";
const express = require('express');
const http = require('http');

const secureChat = require('./modules/secureChat');
const chat = require('./modules/chat');

const app = express();
const server = http.createServer(app);

const port = 3030;

//errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught error', err);
});

//middle
app.use(express.static('public'));

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/start.html');
});

secureChat(app);
chat(server);

//listen
server.listen(port, () => {
  console.log(new Date() + ' >>>>>>>>> listening on: ' + port);
});

//404
app.use((req, res, next) => {
  res.status(404).send("upss, 404!");
})