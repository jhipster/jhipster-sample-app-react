import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BankAccount from './bank-account';
import BankAccountDetail from './bank-account-detail';
import BankAccountUpdate from './bank-account-update';
import BankAccountDeleteDialog from './bank-account-delete-dialog';

const BankAccountRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BankAccount />} />
    <Route path="new" element={<BankAccountUpdate />} />
    <Route path=":id">
      <Route index element={<BankAccountDetail />} />
      <Route path="edit" element={<BankAccountUpdate />} />
      <Route path="delete" element={<BankAccountDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BankAccountRoutes;
