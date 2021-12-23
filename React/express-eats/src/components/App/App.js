// core
import React, { Suspense, useContext } from "react";
// scss
import "./App.scss";
// routes
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
// context
import AuthContext from "./../../store/auth-context";
// error boundary
import ErrorBoundary from "./../common/ErrorBoundary/ErrorBoundary";
// animations
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
// components
import Spinner from "../common/Spinner/Spinner";
const Header = React.lazy(() => import("../Header/Header"));
const Footer = React.lazy(() => import("../Footer/Footer"));
const Wrapper = React.lazy(() => import("../../UI/Wrapper"));
const Home = React.lazy(() => import("./../Home/Home"));
const Login = React.lazy(() => import("../Login/AuthLogin"));
const NotFound = React.lazy(() => import("../NotFound/NotFound"));
const Product = React.lazy(() => import("../Product/Product"));
const AddProduct = React.lazy(() => import("../Product/AddProduct/AddProduct"));
const EditProduct = React.lazy(() =>
  import("../Product/AddProduct/EditProduct")
);

const ViewProducts = React.lazy(() =>
  import("../Product/ViewProduct/ViewProducts")
);
const CartRecipe = React.lazy(() => import("../Cart/CartRecipe"));
const ProductHistory = React.lazy(() =>
  import("../Product/ProductHistory/ProductHistory")
);
const Logout = React.lazy(() => import("../Logout/Logout"));

const App = () => {
  const authCxt = useContext(AuthContext);
  const isUserLoggedIn = authCxt.isUserLoggedIn;
  const history = useHistory();
  const location = useLocation();
  return (
    <Suspense
      fallback={
        <Spinner color="text-white" align="h-100 mh-100 align-items-center" />
      }
    >
      {isUserLoggedIn && <Header />}

      <Wrapper>
        <ErrorBoundary>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={300}
            >
              <Switch location={location}>
                <Route exact path="/">
                  <Redirect to="/Login" />
                </Route>
                <Route path="/Login" component={Login} />
                <Route path="/Home" component={Home} />
                <Route exact path="/ViewProduct">
                  {isUserLoggedIn && <ViewProducts />}
                  {!isUserLoggedIn && <Redirect exact to="/Home" />}
                </Route>
                <Route exact path="/Product" component={Product} />
                <Route exact path="/AddProduct">
                  <AddProduct history={history} />
                </Route>
                <Route
                  exact
                  path="/EditProduct/:id"
                  render={(props) => <EditProduct {...props} />}
                />
                <Route exact path="/Cart" component={CartRecipe} />
                <Route
                  exact
                  path="/ProductHistory"
                  component={ProductHistory}
                />
                <Route path="/Logout" component={Logout} />
                <Route exact path="*" component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </ErrorBoundary>
      </Wrapper>
      {isUserLoggedIn && <Footer />}
    </Suspense>
  );
};

export default App;
