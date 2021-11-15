// core
import firebase from "firebase";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBKQjU1z4exP8hoSAlGa0YLT1axBj6Aj9k",
  authDomain: "react-virtusa-expresseats.firebaseapp.com",
  databaseURL: "https://react-virtusa-expresseats-default-rtdb.firebaseio.com",
  projectId: "react-virtusa-expresseats",
  storageBucket: "react-virtusa-expresseats.appspot.com",
  messagingSenderId: "691365299945",
  appId: "1:691365299945:web:cc3d75b65b05de01dfd278",
};

// initialize app
const expressEatsApp = firebase.initializeApp(firebaseConfig);
// get firestore db
const db = expressEatsApp.firestore();
// get auth
const auth = firebase.auth();

export { db, auth };
