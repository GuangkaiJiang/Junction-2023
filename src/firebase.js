import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC5mW4oANSv2wcsuHq1-ZmagPL6e0JHS3Q",
    authDomain: "junction2023-1fd8c.firebaseapp.com",
    projectId: "junction2023-1fd8c",
    storageBucket: "junction2023-1fd8c.appspot.com",
    messagingSenderId: "871181945525",
    appId: "1:871181945525:web:a12c32d974d5dd92690cfc"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
