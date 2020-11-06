import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyAKBGZC8YiTirKfgUbdconfD2DWufjvJ2I",
  authDomain: "happy-hour-79e9b.firebaseapp.com",
  databaseURL: "https://happy-hour-79e9b.firebaseio.com",
  projectId: "happy-hour-79e9b",
  storageBucket: "happy-hour-79e9b.appspot.com",
  messagingSenderId: "431771581203",
  appId: "1:431771581203:web:8f4694a8d872e2d13ab8e6",
  measurementId: "G-QYXRQBJSQQ"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth }