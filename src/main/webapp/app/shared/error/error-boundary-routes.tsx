import React from 'react';
import { Route, Routes } from 'react-router';
import { Outlet, RoutesProps } from 'react-router-dom';
import ErrorBoundary from 'app/shared/error/error-boundary';

const ErrorBoundaryRoutes = ({ children }: RoutesProps) => {
  return (
    <Routes>
      <Route
        element={
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        }
      >
        {children}
      </Route>
    </Routes>
  );
};

export default ErrorBoundaryRoutes;
