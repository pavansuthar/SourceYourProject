// core
import React from "react";
import ReactDOM from "react-dom";
// css
import "./assets/scss/index.scss";
import "./assets/scss/custom.scss";
// components
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
// router
import { BrowserRouter as Router } from "react-router-dom";
// context
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/ExpressEats">
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
