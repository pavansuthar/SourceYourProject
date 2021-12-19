// core
import React, { useContext, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// context
import AuthContext from "../../store/auth-context";
// component
import Spinner from "../Spinner/Spinner";
import Alerts from "../common/Alerts/Alerts";
// css
import "./AuthLogin.scss";
import InfoCircle from "./../../assets/images/info-circle.svg";
// firebase
import firebase from "firebase";
import { db } from "../../firebase/firebase";

const AuthLogin = () => {
  const authCtx = useContext(AuthContext);
  const { LoggedIn } = authCtx;
  const [isLogin, setIsLogIn] = useState(true);
  const [onLoading, setOnLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const emailField = useRef();
  const pwdField = useRef();
  const getEmailID = emailField?.current?.value;
  const getpassword = pwdField?.current?.value;
  const history = useHistory();

  useEffect(() => {
    return () => {
      setErrorMsg(null);
      setOnLoading(false);
    };
  }, []);

  const ToggleView = () => setIsLogIn((prevState) => !prevState);

  const onHideAlert = () => setErrorMsg(null);

  const onSaveUserToFirebase = () => {
    const isAdminUser = false;
    if (!isLogin) {
      db.collection("users").add({
        emailId: getEmailID.trim(),
        isAdmin: isAdminUser.trim(),
        registeredOn: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  let error = null;
  if (errorMsg) {
    error = (
      <Alerts
        alertType="alert-danger"
        icon={InfoCircle}
        msg={errorMsg}
        onClose={onHideAlert}
      />
    );
  }

  const onLogInHandler = (e) => {
    e.preventDefault();
    setOnLoading(true);

    if (getEmailID === "" || getpassword === "") {
      setErrorMsg("Enter missing fields");
      setOnLoading(false);
      return;
    }

    const apiKey = "AIzaSyBKQjU1z4exP8hoSAlGa0YLT1axBj6Aj9k";
    let url = "";

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    }

    const config = {
      method: "POST",
      body: JSON.stringify({
        email: getEmailID,
        password: getpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, config)
      .then((res) => {
        if (res.ok) {
          setErrorMsg(null);
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        const expTokenTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        onSaveUserToFirebase();
        LoggedIn(data.idToken, expTokenTime.toISOString(), getEmailID);
        history.replace("/Home");
      })
      .catch((err) => {
        setOnLoading(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="row logInSection">
      {error}
      <div className="col-md-12 cards">
        <h3>
          Express <span className="text-primary">Eats</span>
        </h3>
        <div className="row mt-4">
          <div className="col-md-12">
            <h5>Let's get started</h5>
            <div className="col-md-12">
              <form onSubmit={onLogInHandler}>
                <div className="form-group mb-2">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="emailId"
                      placeholder="name@example.com"
                      autoComplete="true"
                      ref={emailField}
                    />
                    <label htmlFor="exampleFormControlInput1">
                      Email address
                    </label>
                  </div>
                </div>
                <div className="form-group mb-2">
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="ABC*****"
                      autoComplete="true"
                      ref={pwdField}
                    />
                    <label htmlFor="exampleFormControlInput1">Password</label>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success rounded-pill mt-2"
                  >
                    {!isLogin ? "Sign up" : "Log in"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mt-2 rounded-pill"
                    onClick={ToggleView}
                  >
                    {isLogin ? "New here? Sign up" : "Already user? Sign in"}
                  </button>
                </div>
                <div className="col-md-12 mt-2">
                  {onLoading && (
                    <Spinner color="text-dark" text="Signning you in" />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
