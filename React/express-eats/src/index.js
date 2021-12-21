// core
import React from "react";
import ReactDOM from "react-dom";
// css
import "./index.scss";
import "./assets/scss/customs.scss";
// components
import App from "./components/App/App";
// router
import { BrowserRouter as Router } from "react-router-dom";
// context
import { AuthContextProvider } from "./store/auth-context";
import RecipeProvider from "./store/RecipeProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/ExpressEats">
      <AuthContextProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
