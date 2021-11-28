// core
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
// context
import AuthContext from "./../../store/auth-context";
// component
import Spinner from "./../Loading/Loading";
// css
import "./../../assets/scss/custom.scss";
import "./../../assets/scss/AuthLoginPage.scss";
// firebase
import firebase from "firebase";
import { db } from "./../../firebase/firebase";

const AuthLoginPage = () => {
  const [isLogin, setIsLogIn] = useState(true);
  const [onLoading, setOnLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const emailField = useRef();
  const pwdField = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const ToggleView = () => setIsLogIn((prevState) => !prevState);

  const onLogInHandler = (e) => {
    e.preventDefault();
    setOnLoading(true);
    const getEmailID = emailField.current.value;
    const getpassword = pwdField.current.value;

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

    // fetch firebase auth api
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
        const isAdminUser = false;
        if (!isLogin) {
          db.collection("users").add({
            emailId: getEmailID,
            isAdmin: isAdminUser,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
        authCtx.LoggedIn(data.idToken, expTokenTime.toISOString(), getEmailID);
        history.replace("/Home");
      })
      .catch((err) => {
        setOnLoading(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <React.Fragment>
      <div className="row logInSection">
        <div className="col-md-12 subMain">
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
                      className="btn btn-primary rounded-pill mt-2"
                    >
                      {!isLogin ? "Sign up" : "Log in"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-light mt-2 rounded-pill"
                      onClick={ToggleView}
                    >
                      {isLogin ? "New here? Signup" : "Already user? Sign in"}
                    </button>
                  </div>
                  <div className="col-md-12 mt-2">
                    {onLoading && <Spinner />}
                  </div>
                  <div className="col-md-12 mt-2 text-danger">
                    <b>{errorMsg}</b>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AuthLoginPage;
