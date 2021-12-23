// core
import React from "react";
import { useHistory } from "react-router-dom";
// css
import "./Logout.scss";

const Logout = () => {
  const history = useHistory();
  const onLoginPage = () => history.push("./Login");
  return (
    <div className="col-md-12 LogoutSec">
      <div className="row">
        <div className="col-md-12 card p-3">
          <h1 className="display-3">You have been LOGGED OUT!</h1>
          <p className="text-primary display-6">
            <b>Thanks for using Expresseats</b>

            <b>
              , click{" "}
              <button className="btn btn-primary btn-lg" onClick={onLoginPage}>
                HERE
              </button>{" "}
              to login again.
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
