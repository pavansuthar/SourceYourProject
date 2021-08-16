// core
import { Component } from "react";
// icons
import { FaHome } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { MdCameraRoll } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
// css
import "./../../assets/css/Content.scss";
// routes
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// components
import Home from "./../Home/Home";
import Actors from "./../Actors/Actors";
import Movies from "./../Movies/Movies";
import Series from "./../Series/Series";
import NoMatch from "./../Nomatch/NoMatch";
import SeriesDetails from "./../Series/SeriesDetails";

class Content extends Component {
  render() {
    return (
      <div className="row Content">
        <Router>
          <div className="col-3">
            <ul className="nav flex-column navigation">
              <li className="nav-item">
                <NavLink className="nav-link" to="/IMDB/Home">
                  <FaHome />
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/IMDB/Actors">
                  <GoPerson />
                  <span>Actors</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/IMDB/Series">
                  <MdCameraRoll />
                  <span>Series</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/IMDB/Movies">
                  <BiCameraMovie/>
                  <span>Movies</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
              >
                <Switch>
                  <Route path="/IMDB/Home" exact>
                    <Home />
                  </Route>
                  <Route path="/IMDB/Actors">
                    <Actors />
                  </Route>
                  <Route path="/IMDB/Series" exact>
                    <Series />
                  </Route>
                  <Route
                    path="/IMDB/Series/Details/:SeriesId"
                    component={SeriesDetails}
                  />
                  <Route path="/IMDB/Movies">
                    <Movies />
                  </Route>
                  <Redirect from="/" to="/IMDB/Home" exact></Redirect>
                  <Route path="*">
                    <NoMatch />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default Content;
