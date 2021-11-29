// core
import React, { useContext } from "react";
// scss
import "./../../assets/scss/App.scss";
// redux
import { Provider } from "react-redux";
// routes
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
// context
import AuthContext from "./../../store/auth-context";
// store
import store from "./../../store/recipe-store";
// error boundary
import ErrorBoundary from "./../ErrorBoundary/ErrorBoundary";
// animations
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// components
import Spinner from "./../Loading/Loading";
const Header = React.lazy(() => import("./../Header/header"));
const Content = React.lazy(() => import("./../Pages/content"));
const Home = React.lazy(() => import("./../Home/Home"));
const Login = React.lazy(() => import("../Login/AuthLoginPage"));
const NotFound = React.lazy(() => import("./../NotFound/notFound"));
const Product = React.lazy(() => import("../Pages/Product"));
const AddProduct = React.lazy(() => import("../Product/AddProduct"));
const ProductData = React.lazy(() => import("../Product/ProductData"));
const ProductInfo = React.lazy(() => import("./../ProductInfo/ProductInfo"));

let App = () => {
  const authCxt = useContext(AuthContext);
  let history = useHistory();

  return (
    <React.Suspense
      fallback={
        <Spinner color="text-white" align="h-100 mh-100 align-items-center" />
      }
    >
      <Provider store={store}>
        {authCxt.isUserLoggedIn && <Header />}
        <ErrorBoundary>
          <Content>
            <Switch>
              <Route exact path="/">
                <Redirect to="/Login" />
              </Route>
              <Route path="/Login" component={Login} />
              <Route path="/Home" component={Home} />
              <Route exact path="/Product">
                {authCxt.isUserLoggedIn && <Product />}
                {!authCxt.isUserLoggedIn && <Redirect exact to="/Home" />}
              </Route>
              <Route exact path="/AddProduct">
                <AddProduct history={history} />
              </Route>
              <Route
                exact
                path="/EditProduct/:id"
                render={(props) => <AddProduct {...props} />}
              />
              <Route path="/ViewProduct" component={ProductData} />
              <Route exact path="/Product/:id" component={ProductInfo} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </Content>
        </ErrorBoundary>
      </Provider>
    </React.Suspense>
  );
};

export default App;
