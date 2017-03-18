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

secureChat(app);
chat(server);

app.use((req, res, next) => {
  res.status(404).send("upss, 404!");
});

//listen
server.listen(port, () => {
  console.log(new Date() + ' >>>>>>>>> ' + port);
});