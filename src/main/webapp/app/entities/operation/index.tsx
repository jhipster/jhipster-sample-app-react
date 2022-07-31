import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Operation from './operation';
import OperationDetail from './operation-detail';
import OperationUpdate from './operation-update';
import OperationDeleteDialog from './operation-delete-dialog';

const OperationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Operation />} />
    <Route path="new" element={<OperationUpdate />} />
    <Route path=":id">
      <Route index element={<OperationDetail />} />
      <Route path="edit" element={<OperationUpdate />} />
      <Route path="delete" element={<OperationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default OperationRoutes;
