importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');
import {hidden} from "../src/hidden";

// const messagingSenderId = hidden[0].messagingSenderId;

firebase.initializeApp(hidden[0])
// firebase.initializeApp({
//     hidden[0].apiKey,
//     hidden[0].authDomain,
//     hidden[0].projectId,
//     hidden[0].storageBucket,
//     hidden[0].messagingSenderId,
//     hidden[0].appId,
//     hidden[0].measurementId,
// });


const messaging = firebase.messaging();