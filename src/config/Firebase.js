// Import the functions you need from the SDKs you need
require('dotenv').config();
const admin = require('firebase-admin');

// Load the Firebase service account key
const serviceAccount = require('../../adminsdk.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET
});

// Firestore database instance
const db = admin.firestore();

// Storage bucket instance
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
