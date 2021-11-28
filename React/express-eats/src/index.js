// core
import React from "react";
import ReactDOM from "react-dom";
// css
import "./assets/scss/index.scss";
import "./assets/scss/custom.scss";
// components
import App from "./components/App/App";
// router
import { BrowserRouter as Router } from "react-router-dom";
// context
import { AuthContextProvider } from "./store/auth-context";
import { RecipeContextProvider } from "./store/recipe-context";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/ExpressEats">
      <AuthContextProvider>
        <RecipeContextProvider>
          <App />
        </RecipeContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
