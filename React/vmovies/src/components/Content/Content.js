// core
import React from "react";
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
import NoMatch from "./../Nomatch/NoMatch";
import SeriesDetails from "./../Series/SeriesDetails";

const asyncHome = React.lazy(() => import("./../Home/Home"));
const asyncActors = React.lazy(() => import("./../Actors/Actors"));
const asyncMovies = React.lazy(() => import("./../Movies/Movies"));
const asyncSeries = React.lazy(() => import("./../Series/Series"));

class Content extends React.Component {
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
                  <BiCameraMovie />
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
                <React.Suspense fallback={<h4>Loading...Please wait..</h4>}>
                  <Switch>
                    <Route path="/IMDB/Home" exact component={asyncHome}/>
                    <Route path="/IMDB/Actors" component={asyncActors}/>
                    <Route path="/IMDB/Series" exact component={asyncSeries}/>
                    <Route path="/IMDB/Series/Details/:SeriesId" component={SeriesDetails}/>
                    <Route path="/IMDB/Movies" component={asyncMovies}/>
                    <Redirect from="/" to="/IMDB/Home" exact/>
                    <Route path="*">
                      <NoMatch />
                    </Route>
                  </Switch>
                </React.Suspense>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default Content;
