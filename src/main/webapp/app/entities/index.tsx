import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BankAccount from './bank-account';
import Label from './label';
import Operation from './operation';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}bank-account`} component={BankAccount} />
      <ErrorBoundaryRoute path={`${match.url}label`} component={Label} />
      <ErrorBoundaryRoute path={`${match.url}operation`} component={Operation} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
