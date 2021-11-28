// aessts
import "./../../assets/scss/home.scss";
import foodImage from "./../../assets/images/main.jpg";

const Home = () => {
  return (
    <div className="row Home">
      <div className="col-md-6 text-light">
        <h1 className="text-bold">Express Eats</h1>
        <h5>Your's favourite hotspot for all foddy things. Discover the best food and drinks</h5>
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
