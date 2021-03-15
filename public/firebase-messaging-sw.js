importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');
import {hidden} from "../src/hidden";

const messagingSenderId = hidden[0].messagingSenderId;

firebase.initializeApp({
    messagingSenderId: messagingSenderId // troque pelo seu sender id 
});

const messaging = firebase.messaging();