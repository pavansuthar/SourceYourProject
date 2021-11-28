// core, hooks
import React from "react";
import { useContext } from "react";
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
// components
import Spinner from "./../Loading/Loading";
const Header = React.lazy(() => import("./../Header/header"));
const Content = React.lazy(() => import("./../Pages/content"));
const Home = React.lazy(() => import("./../Home/Home"));
// const Animate = React.lazy(() => import("../Pages/animate"));
const Login = React.lazy(() => import("../Login/AuthLoginPage"));
const NotFound = React.lazy(() => import("./../NotFound/notFound"));
const Product = React.lazy(() => import("../Pages/Product"));
const AddProduct = React.lazy(() => import("../Product/AddProduct"));
const ProductData = React.lazy(() => import("../Product/ProductData"));
const ProductInfo = React.lazy(() => import("./../ProductInfo/ProductInfo"));

let App = () => {
  const authCxt = useContext(AuthContext);
  const history = useHistory();
  // const params = useParams();
  return (
    <React.Suspense fallback={<Spinner />}>
      <Provider store={store}>
        {authCxt.isUserLoggedIn && <Header />}
        <Content>
          <ErrorBoundary>
            {/* <Animate> */}
            <Switch>
              <Route exact path="/">
                <Redirect exact to="/Login" />
              </Route>
              <Route exact path="/Login" component={Login} />
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
            {/* </Animate> */}
          </ErrorBoundary>
        </Content>
      </Provider>
    </React.Suspense>
  );
};

export default App;
