import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import { GoogleButton } from "./LoginElements";
import googleIcon from "../../images/google-icon.png";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    handleLogout,
    user,
  } = props;

  const history = useHistory();

  const push = () => {
    if (user) {
      console.log(user);
      window.localStorage.setItem("user", user);
      window.localStorage.setItem("handleLogout", handleLogout);
      history.push("/profile");
    }
  };

  const googlePush = () => {
    if (user) {
      window.localStorage.setItem("user", user);
      window.localStorage.setItem("googleSignOut", googleSignOut);
      history.push("/profile");
    }
  };

  var provider = new firebase.auth.GoogleAuthProvider();

  const handleSubmit = (e) => {
    //prevents page refreshing
    e.preventDefault();

    //login
    handleLogin();
    // redirect
    setTimeout(push, 1525);
  };

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
        googlePush();
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const googleSignOut = () => {
    // [START auth_sign_out]
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
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
              <button onClick={handleSubmit}>Sign in</button>
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
