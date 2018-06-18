import * as React from 'react';
import { Switch } from 'react-router-dom';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Account from 'app/modules/account';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import Admin from 'app/modules/administration';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { AUTHORITIES } from 'app/config/constants';

const Routes = () => (
  <div className="view-routes">
    <ErrorBoundaryRoute path="/login" component={Login} />
    <Switch>
      <ErrorBoundaryRoute path="/logout" component={Logout} />
      <ErrorBoundaryRoute path="/register" component={Register} />
      <ErrorBoundaryRoute path="/activate/:key?" component={Activate} />
      <ErrorBoundaryRoute path="/reset/request" component={PasswordResetInit} />
      <ErrorBoundaryRoute path="/reset/finish/:key?" component={PasswordResetFinish} />
      <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path="/account" component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path="/entity" component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path="/" component={Home} />
    </Switch>
  </div>
);

export default Routes;
