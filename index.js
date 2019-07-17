"use strict";
const express = require('express');
const http = require('http');
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const redisClient = require("redis").createClient();

const secureChat = require('./modules/secureChat');
const chat = require('./modules/chat');

const app = express();
const server = http.createServer(app);

const port = 3030;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

app.set('trust proxy', 1);

//errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught error', err);
});

//static
app.use(express.static('public'));

//modules
secureChat(app, redisClient);
chat(server, redisClient);

// ping
app.get('/ping', cors(), limiter, (req, res) => {
  res.json({ data: 'pong' });
});

//404
app.use((req, res, next) => {
  res.status(404).send("upss, 404!");
});

//listen
server.listen(port, () => {
  console.log(new Date() + ' >>>>>>>>> ' + port);
});