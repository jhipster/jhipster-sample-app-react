import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BankAccount from './bank-account';
import BankAccountDetail from './bank-account-detail';
import BankAccountUpdate from './bank-account-update';
import BankAccountDeleteDialog from './bank-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BankAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BankAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BankAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={BankAccount} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BankAccountDeleteDialog} />
  </>
);

export default Routes;
