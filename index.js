"use strict";
const express = require('express');
const http = require('http');

const chat = require('./modules/chat');

const app = express();
const server = http.createServer(app);

const port = 3000;

//errors
process.on('uncaughtException', function(err) {
    console.error('Uncaught error', err);
});

//middle
// app.use(function (req, res, next) {
//     res.status(404).send('404!');
// });
app.use(express.static('public'));

//MAIN
app.get('/', function(req, res){
  res.sendFile(__dirname + 'public/index.html');
});

//modules
chat(server);

//listen
server.listen(port, function(){
  console.log('listening on: ' + port);
});