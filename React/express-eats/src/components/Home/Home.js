// core
import { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
// css
import "./home.scss";
import foodImage from "./../../assets/images/main.jpg";
// components
import Toast from "../common/Toast/Toast";
// context
import AuthContext from "./../../store/auth-context";

const Home = () => {
  const [showToast, setShowToast] = useState(false);
  const authCtx = useContext(AuthContext);
  const isAdminLoggedIn = authCtx.isUserAdmin;

  useEffect(() => {
    if (!localStorage.getItem("showToast")) {
      setShowToast(true);
      localStorage.setItem("showToast", true);
    }
  }, []);

  const onHideToast = () => {
    setShowToast(false);
    localStorage.setItem("showToast", false);
  };

  const toastMsg = `Logged in successfully as ${
    isAdminLoggedIn ? "Admin" : "Customer"
  }.`;

  return (
    <div className="row Home">
      {showToast &&
        ReactDOM.createPortal(
          <Toast message={toastMsg} onClose={onHideToast} />,
          document.getElementById("toast")
        )}
      <div className="col-md-6 text-light">
        <h1 className="text-bold">Express Eats</h1>
        <h5>
          Your's favourite hotspot for all foddy things. Discover the best food
          and drinks
        </h5>
      </div>
      <div className="col-md-6">
        <div className="card mt-3">
          <img className="card-img-top img-fluid" src={foodImage} alt="food" />
        </div>
      </div>
    </div>
  );
};

export default Home;
