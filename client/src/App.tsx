import React from "react";
import Header from "./components/Header/Header";
import Restaurants from "./components/Restaurants/Restaurants";
import { Route, Switch } from "react-router-dom";
import Restinfo from "./components/RestIfo/Restinfo";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/User/Dashboard";
import Profile from "./components/User/Profile";
import AddRestaurant from "./components/User/AddRestaurant";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/addrestaurant/:id" component={AddRestaurant} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route exact path="/dashboard/:id" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:id" component={Restinfo} />
        <Route exact path="/" component={Restaurants} />
      </Switch>
    </>
  );
}

export default App;
