const firebase = require('firebase');
const uuidV1 = require('uuid/v1');

const config = require('../config');

const init = () => {firebase.initializeApp(config.firebase)};

const saveMessage = (name, text) => {
    firebase.database()
            .ref('msgs/' + Date.now())
            .set({
                username: name,
                text: text,
                date: new Date().toString(),
                id: uuidV1()
            });
}

const getHistory = (cb) => {
    firebase.database()
                .ref('msgs/')
                .once('value')
                .then(function(snapshot) {
                    cb(snapshot.val());
                });
}

module.exports = {
    init: init,
    saveMessage: saveMessage,
    getHistory: getHistory
}