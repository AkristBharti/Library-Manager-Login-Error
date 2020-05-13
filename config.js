import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDpeZDJa93V7YuIyxRSN6cHRkge7CIFEbk",
  authDomain: "library-managa.firebaseapp.com",
  databaseURL: "https://library-managa.firebaseio.com",
  projectId: "library-managa",
  storageBucket: "library-managa.appspot.com",
  messagingSenderId: "215826368012",
  appId: "1:215826368012:web:5ad8644992d379c8c0d029",
  measurementId: "G-NWXFXJXYSH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
