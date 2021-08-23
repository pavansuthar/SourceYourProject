// css, images
import "./../../assets/scss/home.scss";
import foodImage from "./../../assets/images/foodImage.jpg";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Home = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isUserLoggedIn;

  const onLogInHandler = () => {
    history.replace("/Login");
  };

  return (
    <div className="row home">
      <div className="col-md-6">
        <h1 className="text-primary text-bold">Express Eats</h1>
        <p>Your's favourite hotspot for all foddy things</p>
        <h3>Eat 🥗 Sleep 😴 Repeat 🔁</h3>
        {!isLoggedIn && (
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={onLogInHandler}
          >
            {" "}
            Login{" "}
          </button>
        )}
      </div>
      <div className="col-md-4">
        <div className="card mt-3">
          <img className="card-img-top img-fluid" src={foodImage} alt="food" />
        </div>
      </div>
    </div>
  );
};

export default Home;
