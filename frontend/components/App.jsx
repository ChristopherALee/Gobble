import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route';
// import { AuthSignUpRoute } from '../util/signup_route_util';
import { ProtectedRoute } from '../util/protected_route';
import SessionFormContainer from './session/session_form_container';
import LandingPageContainer from './landing_page/landing_page_container';
import HomeNavBarContainer from './home_navbar/home_navbar_container';

const App = () => {
  return (
    <div id='gobble-app'>
      <header>
        {/* <h1>gobble</h1> */}
      </header>

      <Route path="/" component={HomeNavBarContainer}></Route>
      <Route exact path="/" component={LandingPageContainer}></Route>

      <Switch>
        <AuthRoute path='/login' component={SessionFormContainer} />
        <AuthRoute path='/signup' component={SessionFormContainer} />
      </Switch>
    </div>
  );
};

export default App;
