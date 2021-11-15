// core, hooks
import React from "react";
import { useContext } from "react";
// scss
import "./../../assets/scss/App.scss";
// components
import Header from "./../Header/header";
import Content from "./../Pages/content";
import Home from "./../Home/Home";
import Auth from "./../Pages/auth";
import NotFound from "./../NotFound/notFound";
import Product from "../Pages/Product";
import AddProduct from "../Product/AddProduct";
import ProductData from "../Product/ProductData";
import ProductInfo from "./../ProductInfo/ProductInfo";
// redux
import { Provider } from "react-redux";
// routes
import { Route, Switch, Redirect } from "react-router-dom";
// context
import AuthContext from "./../../store/auth-context";
// store
import store from "./../../store/recipe-store";

let App = () => {
  const authCxt = useContext(AuthContext);
  return (
    <React.Fragment>
      <Provider store={store}>
        <Header />
        <Content>
          <Switch>
            <Route exact path="/">
              <Redirect exact to="/Home" />
            </Route>
            <Route exact path="/Home" component={Home} />
            <Route path="/Login" component={Auth} />
            <Route exact path="/Product">
              {authCxt.isUserLoggedIn && <Product />}
              {!authCxt.isUserLoggedIn && <Redirect exact to="/Home" />}
            </Route>
            <Route path="/AddProduct">
              <AddProduct store={store} />
            </Route>
            <Route path="/ProductData" component={ProductData} />
            <Route exact path="/Product/:id" component={ProductInfo} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Content>
      </Provider>
    </React.Fragment>
  );
};

export default App;
