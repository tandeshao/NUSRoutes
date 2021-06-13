import fb from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAWDkIRaZJgGyTvZCR63hWn-h_5qwukSrQ",
  authDomain: "nusroutes-83bb6.firebaseapp.com",
  projectId: "nusroutes-83bb6",
  storageBucket: "nusroutes-83bb6.appspot.com",
  messagingSenderId: "536561780354",
  appId: "1:536561780354:web:8bb26dacafd24d669bd69b",
};
const fire = fb.initializeApp(firebaseConfig);

export default fire;
