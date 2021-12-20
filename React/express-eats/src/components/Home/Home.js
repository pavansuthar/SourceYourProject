// core
import { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
// css
import "./home.scss";
import foodImage from "./../../assets/images/main2.jpg";
import foodOrderA from "./../../assets/images/foodA.png";
import foodOrderB from "./../../assets/images/foodB.png";
import foodOrderC from "./../../assets/images/foodC.png";
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
    setTimeout(() => onHideToast(), 3000);
  }, []);

  const onHideToast = () => {
    setShowToast(false);
    localStorage.setItem("showToast", false);
  };

  const toastMsg = `Logged in successfully as ${
    isAdminLoggedIn ? "Admin" : "Customer"
  }.`;

  const cities = [
    "Delhi NCR",
    "Hydreabad",
    "Ahmedabad",
    "Ooty",
    "Kanpur",
    "Kolkata",
    "Chennai",
    "Chandigarh",
    "Shimla",
    "Allahabad",
    "Mumbai",
    "Lucknow",
    "Goa",
    "Ludhiana",
    "Coimbatore",
    "Bengaluru",
    "Kochi",
    "Indore",
    "Guwahati",
    "Bhopal",
    "Mangalore",
    "Udaipur",
  ];

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
          and drinks.
        </h5>
      </div>
      <div className="col-md-6">
        <div className="card mt-3">
          <img className="card-img-top img-fluid" src={foodImage} alt="food" />
        </div>
      </div>
      <div className="col-md-6 text-light mt-3">
        <h1 className="text-bold">Explore</h1>
        <h5>Order food from favourite restaurants near you.</h5>
        <div className="row justify-content-center mt-4">
          <div className="col-md-3 text-light mt-0">
            <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={foodOrderA} alt="foodOrderA" />
              <div className="card-body">
                <p className="card-text text-primary text-center fw-bold">
                  Order Food Online
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 text-light mt-3">
            <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={foodOrderB} alt="foodOrderB" />
              <div className="card-body">
                <p className="card-text text-primary text-center fw-bold">
                  Go out for meals
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 text-light mt-5">
            <div className="card" style={{ width: "18rem" }}>
              <img className="card-img-top" src={foodOrderC} alt="foodOrderC" />
              <div className="card-body">
                <p className="card-text text-primary text-center fw-bold">
                  Expresseats Pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 text-light mt-3 mb-5">
        <h1 className="text-bold">Cities, we deliver to</h1>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {cities.map((name, i) => {
                return <li className="list-group-item m-1" key={i}>{name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
