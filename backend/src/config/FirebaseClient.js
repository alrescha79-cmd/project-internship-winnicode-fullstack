const firebase = require('firebase/app');
require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

// Inisialisasi Firebase Client
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
