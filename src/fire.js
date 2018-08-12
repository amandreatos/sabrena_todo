import firebase from "firebase";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCdLNIIwIH532L_LXjxktGkAF66K2d-niM",
  authDomain: "sabrena-todo.firebaseapp.com",
  databaseURL: "https://sabrena-todo.firebaseio.com",
  projectId: "sabrena-todo",
  storageBucket: "",
  messagingSenderId: "456654420603"
};
const fire = firebase.initializeApp(config);

const auth = firebase.auth();

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
  
export { fire, auth };
