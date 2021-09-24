import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCc4pITITe-Ch3kOgww60GrIqaJuDO2icw",
  authDomain: "uber-eats-cp.firebaseapp.com",
  projectId: "uber-eats-cp",
  storageBucket: "uber-eats-cp.appspot.com",
  messagingSenderId: "589843434366",
  appId: "1:589843434366:web:0b6f4f8ad6470938f1412f",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

app.auth().useDeviceLanguage();

const db = firebase.firestore();
// const storage = firebase.storage();
const auth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment;

export { auth, db, timestamp, increment, firebase, firebaseConfig };
