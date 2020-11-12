import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Pages from "./containers/Pages";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";

import { isUserLoggedIn, getInitialData } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Categorys";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authanticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authanticate) {
      dispatch(getInitialData());
    }
  }, [auth.authanticate]);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/pages" component={Pages} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/categories" component={Category} />
        <PrivateRoute path="/orders" component={Orders} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
