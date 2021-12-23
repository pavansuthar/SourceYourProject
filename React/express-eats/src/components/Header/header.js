// scss
import "./Header.scss";
// icons
import { IoFastFood } from "react-icons/io5";
// routes, hooks
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// context
import AuthContext from "../../store/auth-context";
import RecipeContext from "../../store/recipeContext";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const cartContext = useContext(RecipeContext);
  const { recipes } = cartContext;
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [showThemes, setShowThemes] = useState(false);

  const isLoggedIn = authCtx.isUserLoggedIn;
  const isAdminLoggedIn = authCtx.isUserAdmin;
  const showProductPage = !authCtx.isUserAdmin && isLoggedIn;

  const numberOfCartItems = recipes?.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    setNoOfCartItems(numberOfCartItems);
  }, [numberOfCartItems]);

  const logOutHandler = () => {
    authCtx.LoggedOut();
  };

  const onToggleTheme = () => setShowThemes((prev) => !prev);

  const onChangeTheme = (primary, secondary) => {
    getComputedStyle(document.documentElement).getPropertyValue("--c-primary");
    document.documentElement.style.setProperty("--c-primary", primary);
    document.documentElement.style.setProperty("--c-secondary", secondary);
  };

  return (
    <div className="sticky-top HeaderMain">
      <nav className="navbar navbar-expand-lg navbar-primary">
        <div className="container-fluid">
          <div className="logo">
            Express <IoFastFood /> Eats
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/Home"
                  className="nav-link"
                  aria-current="page"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              {showProductPage && (
                <li className="nav-item">
                  <NavLink
                    to="/Product"
                    className="nav-link"
                    aria-current="page"
                    activeClassName="active"
                  >
                    Product
                  </NavLink>
                </li>
              )}
              {showProductPage && (
                <li className="nav-item">
                  <NavLink
                    to="/Cart"
                    className="nav-link"
                    aria-current="page"
                    activeClassName="active"
                  >
                    Cart
                    {noOfCartItems !== 0 && (
                      <div className="badge">{noOfCartItems}</div>
                    )}
                  </NavLink>
                </li>
              )}
              {isAdminLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    to="/ViewProduct"
                    className="nav-link"
                    aria-current="page"
                    activeClassName="active"
                  >
                    View Products
                  </NavLink>
                </li>
              )}

              {isAdminLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    to="/AddProduct"
                    className="nav-link"
                    aria-current="page"
                    activeClassName="active"
                  >
                    Add Product
                  </NavLink>
                </li>
              )}

              {showProductPage && (
                <li className="nav-item">
                  <NavLink
                    to="/ProductHistory"
                    className="nav-link"
                    aria-current="page"
                    activeClassName="active"
                  >
                    History
                  </NavLink>
                </li>
              )}

              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    to="/Logout"
                    className="nav-link"
                    aria-current="page"
                    activeClassName="active"
                    onClick={logOutHandler}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {isLoggedIn && (
            <div className="d-flex">
              <div className="emailInfo">({authCtx.userEmailId})</div>
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={onToggleTheme}
                >
                  Theme
                </button>
                {showThemes && (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li>
                      <div
                        className="dropdown-item colorA"
                        onClick={onChangeTheme.bind(
                          null,
                          "#0d6efd",
                          "#0d6efd75"
                        )}
                      ></div>
                    </li>
                    <li>
                      <div
                        className="dropdown-item colorB"
                        onClick={onChangeTheme.bind(
                          null,
                          "#198754",
                          "#19875475"
                        )}
                      ></div>
                    </li>
                    <li>
                      <div
                        className="dropdown-item colorC"
                        onClick={onChangeTheme.bind(
                          null,
                          "#673ab7",
                          "#673ab775"
                        )}
                      ></div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
