import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { GoogleButton } from "./LoginElements";
import googleIcon from "../../images/google-icon.png";
import { useState } from "react";
import fire from "../../fire";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const db = firebase.firestore();

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const history = useHistory();

  const push = (user) => {
    window.localStorage.setItem("id", user.uid);
    window.localStorage.setItem("user", user);
    history.push("/profile");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => push(result.user))
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          //no default
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        push(result.user);
        const id = result.user.uid;
        db.collection("user").doc(id).set({
          hist: [],
          fav: [],
        });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          // no default
        }
      });
  };

  var provider = new firebase.auth.GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        //var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        push(result.user);
        const id = result.user.uid;
        const docRef = db.collection("user").doc(id);
        if (docRef.get()) {
        } else {
          console.log("No such document!");
          db.collection("user").doc(id).set({
            hist: [],
            fav: [],
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <h1>NUSRoutes</h1>
        <GoogleButton onClick={handleGoogleSignIn}>
          <img src={googleIcon} alt="google icon" /> Sign in with Google
        </GoogleButton>
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {!hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Have an account?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
