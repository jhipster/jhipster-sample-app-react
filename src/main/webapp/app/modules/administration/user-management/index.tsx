import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserManagement from './user-management';
import UserManagementDetail from './user-management-detail';
import UserManagementUpdate from './user-management-update';
import UserManagementDeleteDialog from './user-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={UserManagementUpdate} />
      <Route exact path={`${match.url}/:login/edit`} component={UserManagementUpdate} />
      <Route exact path={`${match.url}/:login`} component={UserManagementDetail} />
      <Route path={match.url} component={UserManagement} />
    </Switch>
    <Route path={`${match.url}/:login/delete`} component={UserManagementDeleteDialog} />
  </>
);

export default Routes;
