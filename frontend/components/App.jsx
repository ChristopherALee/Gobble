import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../util/auth_route';
// import { AuthSignUpRoute } from '../util/signup_route_util';
import { ProtectedRoute } from '../util/protected_route';
import SessionFormContainer from './session/session_form_container';

const App = () => {
  return (
    <div id='iso-app'>
      <header>
        {/* <h1>gobble</h1> */}
      </header>

      <Switch>
        <AuthRoute path='/login' component={SessionFormContainer} />
        <AuthRoute path='/signup' component={SessionFormContainer} />
      </Switch>
    </div>
  );
};

export default App;
