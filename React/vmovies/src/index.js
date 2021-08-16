// core
import React from "react";
import ReactDOM from "react-dom";
// css
import "./assets/css/Index.scss";
import "bootstrap/dist/css/bootstrap.css";
// components
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
// routes
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/IMDB">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
