import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdjQUH85FNWbQ5-bqMoasLNi7JPoFujT8",
  authDomain: "squealer-8d44e.firebaseapp.com",
  projectId: "squealer-8d44e",
  storageBucket: "squealer-8d44e.appspot.com",
  messagingSenderId: "486033965137",
  appId: "1:486033965137:web:b5c4ddbaf89506fa837870",
  measurementId: "G-3SVNQ6Y0LL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;