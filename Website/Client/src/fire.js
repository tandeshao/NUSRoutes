import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAWDkIRaZJgGyTvZCR63hWn-h_5qwukSrQ",
  authDomain: "nusroutes-83bb6.firebaseapp.com",
  projectId: "nusroutes-83bb6",
  storageBucket: "nusroutes-83bb6.appspot.com",
  messagingSenderId: "536561780354",
  appId: "1:536561780354:web:8bb26dacafd24d669bd69b",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
