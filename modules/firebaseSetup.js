import firebase from 'firebase';
import config from '../config';

firebase.initializeApp(config.firebase);

/**
 * Write message to firebase history
 * @param {*} name user name that post messsage
 * @param {*} text message text that was written by user
 */
const writeMsg = (name, text) => {
	const message = {
		username: name,
		text: text,
		date: (new Date()).toString(),
		id: uuidV1()
	};

    firebase.database()
		.ref('msgs/' + Date.now())
		.set(message);
}

/**
 * This function reads messages history from firebase
 * @param {*} cb callback to be run after firebase read data snapshot
 */
const readData = (cb) => {
    firebase.database()
		.ref('msgs/')
		.once('value')
		.then(function(snapshot) {
			const snapshotValue = snapshot.val();
			cb(snapshotValue);
		});
}

export const postMessage = writeMsg;
export const getMessages = readMsg;
