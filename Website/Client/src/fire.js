import fb from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_UNSPLASH_APIKEY,
  authDomain: process.env.REACT_APP_UNSPLASH_AUTHDOMAIN,
  projectId: process.env.REACT_APP_UNSPLASH_PROJECTID,
  storageBucket: process.env.REACT_APP_UNSPLASH_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_UNSPLASH_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_UNSPLASH_APPID,
};
const fire = fb.initializeApp(firebaseConfig);

export default fire;
