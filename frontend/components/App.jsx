import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthRoute } from "../util/auth_route";
// import { AuthSignUpRoute } from '../util/signup_route_util';
import { ProtectedRoute } from "../util/protected_route";
import SessionFormContainer from "./session/session_form_container";
import LandingPageContainer from "./landing_page/landing_page_container";
import HomeNavBarContainer from "./home_navbar/home_navbar_container";
import MainGobbleContainer from "./main_gobble/main_gobble_container";

const App = () => {
  return (
    <div id="gobble-app">
      <header>{/* <h1>gobble</h1> */}</header>

      <Route exact path="/login" component={HomeNavBarContainer} />
      <Route exact path="/signup" component={HomeNavBarContainer} />

      <Switch>
        <AuthRoute exact path="/" component={HomeNavBarContainer} />
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute path="/" component={MainGobbleContainer} />
      </Switch>

      <Route exact path="/" component={LandingPageContainer} />
    </div>
  );
};

export default App;
