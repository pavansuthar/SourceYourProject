// scss
import "./../../assets/scss/header.scss";
// icons
import { IoFastFood } from "react-icons/io5";
// routes, hooks
import { Link } from "react-router-dom";
import { useContext } from "react";
// context
import AuthContext from "../../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isUserLoggedIn;

  /**
   * Handler when user log out
   */
  const logOutHandler = () => {
    authCtx.LoggedOut();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
        <div className="container-fluid">
          <Link to="/Home" className="navbar-brand">
            Express <IoFastFood /> Eats
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/Home" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/Product" className="nav-link" aria-current="page">
                    Product
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    to="/Home"
                    className="nav-link"
                    aria-current="page"
                    onClick={logOutHandler}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
