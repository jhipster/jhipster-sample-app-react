import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Label from './label';
import LabelDetail from './label-detail';
import LabelUpdate from './label-update';
import LabelDeleteDialog from './label-delete-dialog';

const LabelRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Label />} />
    <Route path="new" element={<LabelUpdate />} />
    <Route path=":id">
      <Route index element={<LabelDetail />} />
      <Route path="edit" element={<LabelUpdate />} />
      <Route path="delete" element={<LabelDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LabelRoutes;
